import type Account from "../../domain/account.entity.ts";
import type { AccountRepository } from "../ports/account.repository.ts";
import type { PasswordHasher } from "../ports/password-hasher.ts";

export interface RegisterAccountCommand {
  email: string;
  password: string;
  name: string;
}

export class RegisterAccountUseCase {
  readonly #repository: AccountRepository;
  readonly #passwordHasher: PasswordHasher;

  constructor(repository: AccountRepository, passwordHasher: PasswordHasher) {
    this.#repository = repository;
    this.#passwordHasher = passwordHasher;
  }

  async execute(command: RegisterAccountCommand): Promise<Account> {
    const passwordHash = await this.#passwordHasher.hash(command.password);

    return this.#repository.create({
      name: command.name,
      email: command.email,
      passwordHash,
    });
  }
}
