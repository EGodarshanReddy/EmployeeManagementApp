
import { hash, compare } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

/**
 * Hash a plain text password
 * @param plainPassword - The raw password from the user
 * @returns A hashed password string
 */
export async function hashPassword(plainPassword: string): Promise<string> {
  return await hash(plainPassword);
}

/**
 * Compare a plain text password with a hashed password
 * @param plainPassword - The password provided during login
 * @param hashedPassword - The password stored in the database
 * @returns true if passwords match, false otherwise
 */
export async function comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return await compare(plainPassword, hashedPassword);
}
