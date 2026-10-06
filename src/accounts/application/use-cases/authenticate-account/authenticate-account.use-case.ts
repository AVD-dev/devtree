import { AccountNotFoundError } from "../../errors/account-not-found.error.ts";
import { InvalidCredentialsError } from "../../errors/invalid-credentials.error.ts";
import type { AccountRepository } from "../../ports/account.repository.ts";
import type { PasswordVerifier } from "../../ports/password-verifier.ts";
import type { AuthenticateAccountCommand } from "./authenticate-account.command.ts";

export class AuthenticateAccountUseCase {
  readonly #repository: AccountRepository;
  readonly #passwordVerifier: PasswordVerifier;

  constructor(
    repository: AccountRepository,
    passwordVerifier: PasswordVerifier,
  ) {
    this.#repository = repository;
    this.#passwordVerifier = passwordVerifier;
  }

  async execute(command: AuthenticateAccountCommand): Promise<boolean> {
    const registeredAccount = await this.#repository.findByEmail(command.email);

    if (!registeredAccount) {
      throw new AccountNotFoundError();
    }

    const isValidPassword = await this.#passwordVerifier.verify(
      command.password,
      registeredAccount.passwordHash,
    );

    if (!isValidPassword) {
      throw new InvalidCredentialsError();
    }

    return true;
  }
}
