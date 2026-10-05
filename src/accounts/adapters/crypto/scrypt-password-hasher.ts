import { randomBytes, scrypt } from "node:crypto";
import { promisify } from "node:util";
import type { PasswordHasher } from "../../application/ports/password-hasher.ts";

const scryptAsync = promisify(scrypt);

export class ScryptPasswordHasher implements PasswordHasher {
  async hash(password: string): Promise<string> {
    const salt = randomBytes(16).toString("hex");
    const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;

    return `scrypt:${salt}:${derivedKey.toString("hex")}`;
  }
}
