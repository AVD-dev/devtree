import { Router } from "express";
import { RegisterAccountUseCase } from "../../application/use-cases/register-account/register-account.use-case.ts";
import { ScryptPasswordHasher } from "../crypto/scrypt-password-hasher.ts";
import { UuidGenerator } from "../crypto/uuid-generator.ts";
import { MongooseAccountRepository } from "../persistence/mongoose/mongoose-account.repository.ts";
import { signUpBodyValidator } from "./sign-up/sign-up-body.validator.ts";
import { signUpHandler } from "./sign-up/sign-up.handler.ts";

const router = Router();

const accountRepository = new MongooseAccountRepository();

const registerAccountUseCase = new RegisterAccountUseCase(
  accountRepository,
  new ScryptPasswordHasher(),
  new UuidGenerator(),
);

router.post("/", signUpBodyValidator, signUpHandler(registerAccountUseCase));

export default router;
