import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

const HASH_KEY_LENGTH = 64;
const SALT_LENGTH = 16;
const TOKEN_LENGTH = 40;

export function hashPassword(password: string): string {
  const salt = randomBytes(SALT_LENGTH).toString("hex");
  const derived = scryptSync(password, salt, HASH_KEY_LENGTH);
  return `${salt}:${derived.toString("hex")}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  if (!storedHash.includes(":")) return false;

  const [salt, key] = storedHash.split(":");
  const derived = scryptSync(password, salt, HASH_KEY_LENGTH);
  const stored = Buffer.from(key, "hex");

  if (stored.length !== derived.length) {
    return false;
  }

  return timingSafeEqual(stored, derived);
}

export function generateRandomToken(length = TOKEN_LENGTH): string {
  return randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}

export function hashToken(token: string): string {
  const salt = randomBytes(SALT_LENGTH).toString("hex");
  const derived = scryptSync(token, salt, HASH_KEY_LENGTH);
  return `${salt}:${derived.toString("hex")}`;
}

export function verifyToken(token: string, storedHash: string): boolean {
  if (!storedHash.includes(":")) return false;
  const [salt, key] = storedHash.split(":");
  const derived = scryptSync(token, salt, HASH_KEY_LENGTH);
  const stored = Buffer.from(key, "hex");
  if (stored.length !== derived.length) return false;
  return timingSafeEqual(stored, derived);
}
