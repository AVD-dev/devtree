import { Router } from "express";
import { CreateUserUseCase } from "../../domains/auth/application/use-cases/create-user.use-case.ts";
import { MongooseUserRepository } from "../../domains/auth/infrastructure/repository/mongoose-user.repository.ts";
import { createUserHandler } from "./handlers/create-user.handler.ts";

const router = Router();

const userRepository = new MongooseUserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);

router.post("/", createUserHandler(createUserUseCase));

router.get("/foo", (req, res) => res.send("Foo works"));

export default router;
