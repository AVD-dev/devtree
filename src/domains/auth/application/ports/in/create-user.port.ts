import type User from "../../../domain/user.entity.ts";

export interface CreateUserCommand {
  email: string;
  password: string;
  name: string;
}

export interface CreateUserPort {
  execute(command: CreateUserCommand): Promise<User>;
}
