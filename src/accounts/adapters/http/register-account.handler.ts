import type { Request, Response } from "express";
import type { RegisterAccountUseCase } from "../../application/use-cases/register-account.use-case.ts";
import AccountModel from "../persistence/mongoose/account.model.ts";

interface RegisterAccountRequestBody {
  name: string;
  email: string;
  password: string;
}

type BodyRequest<Tbody> = Request<Record<string, never>, unknown, Tbody>;

export function registerAccountHandler(
  registerAccount: RegisterAccountUseCase,
) {
  return async (
    req: BodyRequest<RegisterAccountRequestBody>,
    res: Response,
  ) => {
    const { name, email, password } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !name.trim() ||
      !email.trim() ||
      password.length === 0
    ) {
      return res.status(400).json({
        message: "Name, email and password must be non-empty strings",
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
