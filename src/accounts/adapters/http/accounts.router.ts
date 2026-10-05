import { Router } from "express";
import { RegisterAccountUseCase } from "../../application/use-cases/register-account.use-case.ts";
import { ScryptPasswordHasher } from "../crypto/scrypt-password-hasher.ts";
import { MongooseAccountRepository } from "../persistence/mongoose/mongoose-account.repository.ts";
import { registerAccountHandler } from "./register-account.handler.ts";

const router = Router();

const accountRepository = new MongooseAccountRepository();

const registerAccountUseCase = new RegisterAccountUseCase(
  accountRepository,
  new ScryptPasswordHasher(),
);

router.post("/", registerAccountHandler(registerAccountUseCase));

router.get("/foo", (_req, res) => res.send("Foo works"));

export default router;
