import { ScryptPasswordHasher } from "../../accounts/adapters/crypto/scrypt-password-hasher.ts";
import { UuidGenerator } from "../../accounts/adapters/crypto/uuid-generator.ts";
import { createAccountsRouter } from "../../accounts/adapters/http/accounts.router.ts";
import { MongooseAccountRepository } from "../../accounts/adapters/persistence/mongoose/mongoose-account.repository.ts";
import { AuthenticateAccountUseCase } from "../../accounts/application/use-cases/authenticate-account/authenticate-account.use-case.ts";
import { RegisterAccountUseCase } from "../../accounts/application/use-cases/register-account/register-account.use-case.ts";

export function composeAccountsRouter() {
  const accountRepository = new MongooseAccountRepository();
  const passwordHasher = new ScryptPasswordHasher();
  const accountIdGenerator = new UuidGenerator();

  const registerAccount = new RegisterAccountUseCase(
    accountRepository,
    passwordHasher,
    accountIdGenerator,
  );

  const authenticateAccount = new AuthenticateAccountUseCase(
    accountRepository,
    passwordHasher,
  );

  return createAccountsRouter(registerAccount, authenticateAccount);
}
