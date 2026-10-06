import type { AccountRepository } from "../../../application/ports/account.repository.ts";
import Account from "../../../domain/account.entity.ts";
import AccountModel from "./account.model.ts";

export class MongooseAccountRepository implements AccountRepository {
  async findByEmail(email: string): Promise<Account | null> {
    const document = await AccountModel.findOne({ email: email.trim() });

    if (!document) {
      return null;
    }

    return Account.reconstitute({
      id: document._id,
      name: document.name,
      email: document.email,
      handle: document.handle,
      passwordHash: document.passwordHash,
    });
  }

  async save(account: Account): Promise<void> {
    await AccountModel.create({
      _id: account.id,
      name: account.name,
      email: account.email,
      handle: account.handle,
      passwordHash: account.passwordHash,
    });
  }
}
