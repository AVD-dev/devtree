import type User from "../../domain/user.entity.ts";
import type {
  CreateUserCommand,
  CreateUserPort,
} from "../ports/in/create-user.port.ts";

import type { UserRepositoryPort } from "../ports/out/user.repository.port.ts";

export class CreateUserUseCase implements CreateUserPort {
  #repository!: UserRepositoryPort;

  constructor(userRepository: UserRepositoryPort) {
    this.#repository = userRepository;
  }

  async execute(command: CreateUserCommand): Promise<User> {
    return this.#repository.create(command);
  }
}
