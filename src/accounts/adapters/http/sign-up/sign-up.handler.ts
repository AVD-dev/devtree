import type { Response } from "express";
import { validationResult } from "express-validator";
import { AccountAlreadyExistsError } from "../../../application/errors/account-already-exist.error.ts";
import { type RegisterAccountUseCase } from "../../../application/use-cases/register-account/register-account.use-case.ts";
import type { BodyRequest, SignUpRequestBody } from "./sign-up.types.ts";

export function signUpHandler(registerAccount: RegisterAccountUseCase) {
  return async (req: BodyRequest<SignUpRequestBody>, res: Response) => {
    const { name, email, password, handle } = req.body;
    const errorsValidation = validationResult(req);

    if (!errorsValidation.isEmpty()) {
      return res.status(400).json({
        error: errorsValidation
          .array()
          .filter((error) => error.type === "field")
          .map(({ path, msg }) => ({ path, msg })),
      });
    }

    try {
      const account = await registerAccount.execute({
        name,
        email,
        password,
        handle,
      });

      return res.status(201).json({
        name: account.name,
        email: account.email,
        handle: account.handle,
      });
    } catch (error) {
      if (error instanceof AccountAlreadyExistsError) {
        return res.status(409).json({ message: error.message });
      }

      throw error;
    }
  };
}
