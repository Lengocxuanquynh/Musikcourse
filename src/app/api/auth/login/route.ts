import { NextResponse } from 'next/server';
import { createSession, loginAdmin } from '@/lib/auth';
import { loginSchema } from '@/lib/validations';
import { jsonError, zodError } from '@/lib/api-utils';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) return zodError(parsed.error);

    const user = await loginAdmin(parsed.data.email, parsed.data.password);
    if (!user) return jsonError('Email hoặc mật khẩu không đúng', 401);

    await createSession(user);
    return NextResponse.json({ user });
  } catch {
    return jsonError('Đăng nhập thất bại', 500);
  }
}
