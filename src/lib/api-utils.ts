import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { ZodError } from 'zod';

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function zodError(error: ZodError) {
  const message = error.issues.map((i) => i.message).join(', ');
  return jsonError(message, 400);
}

export async function requireSession() {
  const session = await getSession();
  if (!session) return null;
  return session;
}

export async function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
