import assert from "node:assert/strict";
import { describe, it } from "node:test";
import Account from "../../../domain/account.entity.ts";
import type { AccountIdGenerator } from "../../ports/account-id-generator.ts";
import type { AccountRepository } from "../../ports/account.repository.ts";
import type { PasswordHasher } from "../../ports/password-hasher.ts";
import {
  AccountAlreadyExistsError,
  RegisterAccountUseCase,
} from "./register-account.use-case.ts";

class AccountRepositoryStub implements AccountRepository {
  accountToReturn: Account | null = null;
  savedAccount?: Account;

  async findByEmail(): Promise<Account | null> {
    return this.accountToReturn;
  }

  async save(account: Account): Promise<void> {
    this.savedAccount = account;
  }
}

const passwordHasherStub: PasswordHasher = {
  async hash(password) {
    return `hashed:${password}`;
  },
};

const idGeneratorStub: AccountIdGenerator = {
  generate() {
    return "account-1";
  },
};

describe("RegisterAccountUseCase", () => {
  it("creates and saves a domain entity", async () => {
    const repository = new AccountRepositoryStub();
    const registerAccount = new RegisterAccountUseCase(
      repository,
      passwordHasherStub,
      idGeneratorStub,
    );
    const command = {
      name: " Ada Lovelace ",
      email: " ada@example.com ",
      password: "secret-password",
      handle: " Ada Lovelace ",
    };

    const result = await registerAccount.execute(command);

    assert.equal(repository.savedAccount, result);
    assert.deepEqual(
      {
        id: result.id,
        name: result.name,
        email: result.email,
        handle: result.handle,
        passwordHash: result.passwordHash,
      },
      {
        id: "account-1",
        name: "Ada Lovelace",
        email: "ada@example.com",
        handle: "ada_lovelace",
        passwordHash: "hashed:secret-password",
      },
    );
  });

  it("does not save when the email is already registered", async () => {
    const repository = new AccountRepositoryStub();
    repository.accountToReturn = Account.reconstitute({
      id: "existing-account",
      name: "Existing Account",
      email: "existing@example.com",
      passwordHash: "stored-hash",
      handle: "existing",
    });
    const registerAccount = new RegisterAccountUseCase(
      repository,
      passwordHasherStub,
      idGeneratorStub,
    );

    await assert.rejects(
      registerAccount.execute({
        name: "Another Account",
        email: "existing@example.com",
        password: "secret-password",
        handle: "another",
      }),
      AccountAlreadyExistsError,
    );
    assert.equal(repository.savedAccount, undefined);
  });
});
