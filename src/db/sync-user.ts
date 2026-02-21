/**
 * With Better Auth, users are stored directly in our database.
 * This file is kept for backward compatibility but is no longer needed.
 * The `user` table from auth-schema.ts is used instead of usersSync.
 */

type BetterAuthUser = {
  id: string;
  name: string;
  email: string;
};

/**
 * No-op function - Better Auth automatically manages users in the database.
 * Kept for backward compatibility with existing code.
 */
export async function ensureUserExists(_user: BetterAuthUser): Promise<void> {
  // No-op: Better Auth handles user storage automatically
  return;
}
