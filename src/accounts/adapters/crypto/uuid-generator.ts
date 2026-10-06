import { randomUUID } from "node:crypto";
import type { AccountIdGenerator } from "../../application/ports/account-id-generator.ts";

export class UuidGenerator implements AccountIdGenerator {
  generate(): string {
    return randomUUID();
  }
}
