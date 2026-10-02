import type User from "../../../domain/user.entity.ts";

export interface CreateUserData {
  email: string;
  password: string;
  name: string;
}

export interface UserRepositoryPort {
  create(data: CreateUserData): Promise<User>;
}
