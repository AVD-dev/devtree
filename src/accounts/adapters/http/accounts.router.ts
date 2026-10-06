import { Router } from "express";
import type { RegisterAccountUseCase } from "../../application/use-cases/register-account/register-account.use-case.ts";
import { signUpBodyValidator } from "./sign-up/sign-up-body.validator.ts";
import { signUpHandler } from "./sign-up/sign-up.handler.ts";

export function createAccountsRouter(
  registerAccount: RegisterAccountUseCase,
) {
  const router = Router();

  router.post("/", signUpBodyValidator, signUpHandler(registerAccount));

  return router;
}
