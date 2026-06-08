import { db } from './db';

export async function safeDbQuery<T>(
  query: () => Promise<T>,
  fallback: T
): Promise<T> {
  if (!process.env.DATABASE_URL) return fallback;
  try {
    return await query();
  } catch {
    return fallback;
  }
}

export { db };
