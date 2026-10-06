import assert from "node:assert/strict";
import { describe, it } from "node:test";
import Account from "../../../domain/account.entity.ts";
import { AccountNotFoundError } from "../../errors/account-not-found.error.ts";
import { InvalidCredentialsError } from "../../errors/invalid-credentials.error.ts";
import type { AccountRepository } from "../../ports/account.repository.ts";
import type { PasswordVerifier } from "../../ports/password-verifier.ts";
import { AuthenticateAccountUseCase } from "./authenticate-account.use-case.ts";

class AccountRepositoryStub implements AccountRepository {
  accountToReturn: Account | null = null;

  async findByEmail(): Promise<Account | null> {
    return this.accountToReturn;
  }

  async save(): Promise<void> {}
}

class PasswordVerifierStub implements PasswordVerifier {
  result = true;
  receivedCredentials: Array<{
    password: string;
    passwordHash: string;
  }> = [];

  async verify(password: string, passwordHash: string): Promise<boolean> {
    this.receivedCredentials.push({ password, passwordHash });
    return this.result;
  }
}

const registeredAccount = Account.reconstitute({
  id: "account-1",
  name: "Ada Lovelace",
  email: "ada@example.com",
  handle: "ada_lovelace",
  passwordHash: "stored-password-hash",
});

describe("AuthenticateAccountUseCase", () => {
  it("authenticates an account when the password is valid", async () => {
    const repository = new AccountRepositoryStub();
    const passwordVerifier = new PasswordVerifierStub();
    repository.accountToReturn = registeredAccount;
    const authenticateAccount = new AuthenticateAccountUseCase(
      repository,
      passwordVerifier,
    );

    const result = await authenticateAccount.execute({
      email: "ada@example.com",
      password: "secret-password",
    });

    assert.equal(result, true);
    assert.deepEqual(passwordVerifier.receivedCredentials, [
      {
        password: "secret-password",
        passwordHash: "stored-password-hash",
      },
    ]);
  });

  it("rejects authentication when the password is invalid", async () => {
    const repository = new AccountRepositoryStub();
    const passwordVerifier = new PasswordVerifierStub();
    repository.accountToReturn = registeredAccount;
    passwordVerifier.result = false;
    const authenticateAccount = new AuthenticateAccountUseCase(
      repository,
      passwordVerifier,
    );

    await assert.rejects(
      authenticateAccount.execute({
        email: "ada@example.com",
        password: "wrong-password",
      }),
      InvalidCredentialsError,
    );
    assert.deepEqual(passwordVerifier.receivedCredentials, [
      {
        password: "wrong-password",
        passwordHash: "stored-password-hash",
      },
    ]);
  });

  it("does not verify the password when the account does not exist", async () => {
    const repository = new AccountRepositoryStub();
    const passwordVerifier = new PasswordVerifierStub();
    const authenticateAccount = new AuthenticateAccountUseCase(
      repository,
      passwordVerifier,
    );

    await assert.rejects(
      authenticateAccount.execute({
        email: "missing@example.com",
        password: "secret-password",
      }),
      AccountNotFoundError,
    );
    assert.deepEqual(passwordVerifier.receivedCredentials, []);
  });
});
