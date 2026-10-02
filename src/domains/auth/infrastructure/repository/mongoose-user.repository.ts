import type {
  CreateUserData,
  UserRepositoryPort,
} from "../../application/ports/out/user.repository.port.ts";
import type User from "../../domain/user.entity.ts";
import UserModel from "./user.model.ts";

export class MongooseUserRepository implements UserRepositoryPort {
  async create(data: CreateUserData): Promise<User> {
    const document = await UserModel.create(data);

    return {
      // id: document.id,
      name: document.name,
      email: document.email,
      password: document.password,
    };
  }
}
