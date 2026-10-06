import type Account from "../../domain/account.entity.ts";

export interface AccountRepository {
  findByEmail(email: string): Promise<Account | null>;
  save(account: Account): Promise<void>;
}
