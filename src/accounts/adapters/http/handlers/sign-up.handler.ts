import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import type { RegisterAccountUseCase } from "../../../application/use-cases/register-account.use-case.ts";
import AccountModel from "../../persistence/mongoose/account.model.ts";

export interface SignUpRequestBody {
  name: string;
  email: string;
  password: string;
}

type BodyRequest<Tbody> = Request<Record<string, never>, unknown, Tbody>;

export function signUpHandler(registerAccount: RegisterAccountUseCase) {
  return async (req: BodyRequest<SignUpRequestBody>, res: Response) => {
    const { name, email, password } = req.body;
    const errorsValidation = validationResult(req);

    if (!errorsValidation.isEmpty()) {
      return res.status(400).json({
        error: errorsValidation
          .array()
          .filter((error) => error.type === "field")
          .map(({ path, msg }) => ({ path, msg })),
      });
    }

    const userExist = await AccountModel.findOne({ email });

    if (userExist) {
      return res.status(409).json({ message: "Account already exist" });
    }

    const account = await registerAccount.execute({
      name,
      email,
      password,
    });

    return res.status(201).json({
      name: account.name,
      email: account.email,
    });
  };
}
