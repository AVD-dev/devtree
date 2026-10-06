import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import type { PasswordHasher } from "../../application/ports/password-hasher.ts";
import type { PasswordVerifier } from "../../application/ports/password-verifier.ts";

const scryptAsync = promisify(scrypt);
const KEY_LENGTH = 64;
export class ScryptPasswordHasher implements PasswordHasher, PasswordVerifier {
  async hash(password: string): Promise<string> {
    const salt = randomBytes(16).toString("hex");
    const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;

    return `scrypt:${salt}:${derivedKey.toString("hex")}`;
  }

  async verify(password: string, passwordHash: string): Promise<boolean> {
    const [algorithm, salt, storedKeyHex] = passwordHash.split(":");

    if (algorithm !== "scrypt" || !salt || !storedKeyHex) {
      return false;
    }
    const storedKey = Buffer.from(storedKeyHex, "hex");

    if (storedKey.length !== KEY_LENGTH) {
      return false;
    }

    const suppliedKey = (await scryptAsync(
      password,
      salt,
      storedKey.length,
    )) as Buffer;

    return timingSafeEqual(storedKey, suppliedKey);
  }
}
