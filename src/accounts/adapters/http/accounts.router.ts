import { Router } from "express";
import { AuthenticateAccountUseCase } from "../../application/use-cases/authenticate-account/authenticate-account.use-case.ts";
import type { RegisterAccountUseCase } from "../../application/use-cases/register-account/register-account.use-case.ts";
import { validateRequest } from "./middleware/validate-request.middleware.ts";
import { signInBodyValidator } from "./sign-in/sign-in-body.validator.ts";
import { signInHandler } from "./sign-in/sign-in.handler.ts";
import { signUpBodyValidator } from "./sign-up/sign-up-body.validator.ts";
import { signUpHandler } from "./sign-up/sign-up.handler.ts";

export function createAccountsRouter(
  registerAccount: RegisterAccountUseCase,
  authenticateAccount: AuthenticateAccountUseCase,
) {
  const router = Router();

  router.post(
    "/account/sign-up",
    signUpBodyValidator,
    validateRequest,
    signUpHandler(registerAccount),
  );

  router.post(
    "/account/sign-in",
    signInBodyValidator,
    validateRequest,
    signInHandler(authenticateAccount),
  );

  return router;
}
