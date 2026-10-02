import type { Request, Response } from "express";
import type { CreateUserPort } from "../../../domains/auth/application/ports/in/create-user.port.ts";

export function createUserHandler(createUser: CreateUserPort) {
  return async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        message: "name, email and password are required",
      });
      return;
    }

    const user = await createUser.execute({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(201).json({
      name: user.name,
      email: user.email,
    });
  };
}
