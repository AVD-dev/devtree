import type { Response } from "express";
import { AccountNotFoundError } from "../../../application/errors/account-not-found.error.ts";
import { InvalidCredentialsError } from "../../../application/errors/invalid-credentials.error.ts";
import { AuthenticateAccountUseCase } from "../../../application/use-cases/authenticate-account/authenticate-account.use-case.ts";
import type { BodyRequest } from "../shared/body-request.type.ts";
import type { SignInRequestBody } from "./sign-in.types.ts";

export function signInHandler(authenticateAccount: AuthenticateAccountUseCase) {
  return async (req: BodyRequest<SignInRequestBody>, res: Response) => {
    const { email, password } = req.body;

    try {
      await authenticateAccount.execute({
        email,
        password,
      });

      return res.status(200).json({});
    } catch (error) {
      if (error instanceof AccountNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      if (error instanceof InvalidCredentialsError) {
        return res.status(401).json({ message: error.message });
      }
      throw error;
    }
  };
}
