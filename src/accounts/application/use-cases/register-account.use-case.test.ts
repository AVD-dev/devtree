import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type {
  AccountRepository,
  CreateAccountData,
} from "../ports/account.repository.ts";
import type { PasswordHasher } from "../ports/password-hasher.ts";
import type Account from "../../domain/account.entity.ts";
import { RegisterAccountUseCase } from "./register-account.use-case.ts";

class AccountRepositoryStub implements AccountRepository {
  receivedData?: CreateAccountData;

  async create(data: CreateAccountData): Promise<Account> {
    this.receivedData = data;

    return {
      id: "account-1",
      name: data.name,
      email: data.email,
    };
  }
}

const passwordHasherStub: PasswordHasher = {
  async hash(password) {
    return `hashed:${password}`;
  },
};

describe("RegisterAccountUseCase", () => {
  it("registers an account through the repository", async () => {
    const repository = new AccountRepositoryStub();
    const registerAccount = new RegisterAccountUseCase(
      repository,
      passwordHasherStub,
    );
    const command = {
      name: "Ada Lovelace",
      email: "ada@example.com",
      password: "secret-password",
    };

    const result = await registerAccount.execute(command);

    assert.deepEqual(repository.receivedData, {
      name: command.name,
      email: command.email,
      passwordHash: "hashed:secret-password",
    });
    assert.deepEqual(result, {
      id: "account-1",
      name: command.name,
      email: command.email,
    });
  });
});
