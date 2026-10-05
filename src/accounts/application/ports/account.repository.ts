import type Account from "../../domain/account.entity.ts";

export interface CreateAccountData {
  email: string;
  passwordHash: string;
  name: string;
}

export interface AccountRepository {
  create(data: CreateAccountData): Promise<Account>;
}
