import Account from "../../../domain/account.entity.ts";
import { AccountAlreadyExistsError } from "../../errors/account-already-exist.error.ts";
import type { AccountIdGenerator } from "../../ports/account-id-generator.ts";
import type { AccountRepository } from "../../ports/account.repository.ts";
import type { PasswordHasher } from "../../ports/password-hasher.ts";
import type { RegisterAccountCommand } from "./register-account.command.ts";

export class RegisterAccountUseCase {
  readonly #repository: AccountRepository;
  readonly #passwordHasher: PasswordHasher;
  readonly #idGenerator: AccountIdGenerator;

  constructor(
    repository: AccountRepository,
    passwordHasher: PasswordHasher,
    idGenerator: AccountIdGenerator,
  ) {
    this.#repository = repository;
    this.#passwordHasher = passwordHasher;
    this.#idGenerator = idGenerator;
  }

  async execute(command: RegisterAccountCommand): Promise<Account> {
    const existingAccount = await this.#repository.findByEmail(command.email);

    if (existingAccount) {
      throw new AccountAlreadyExistsError();
    }

    const passwordHash = await this.#passwordHasher.hash(command.password);

    const account = Account.create({
      id: this.#idGenerator.generate(),
      name: command.name,
      email: command.email,
      handle: command.handle,
      passwordHash,
    });

    await this.#repository.save(account);

    return account;
  }
}
