import type {
  AccountRepository,
  CreateAccountData,
} from "../../../application/ports/account.repository.ts";
import type Account from "../../../domain/account.entity.ts";
import AccountModel from "./account.model.ts";

export class MongooseAccountRepository implements AccountRepository {
  async create(data: CreateAccountData): Promise<Account> {
    const document = await AccountModel.create(data);

    return {
      id: document.id,
      name: document.name,
      email: document.email,
    };
  }
}
