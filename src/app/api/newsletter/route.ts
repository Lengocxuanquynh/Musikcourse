import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { newsletterSchema } from '@/lib/validations';
import { jsonError, zodError } from '@/lib/api-utils';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = newsletterSchema.safeParse(body);
    if (!parsed.success) return zodError(parsed.error);

    const existing = await db.newsletterSubscriber.findUnique({
      where: { email: parsed.data.email },
    });

    if (existing) {
      return NextResponse.json({ success: true, message: 'Email đã đăng ký' });
    }

    await db.newsletterSubscriber.create({
      data: { email: parsed.data.email },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return jsonError('Đăng ký newsletter thất bại', 500);
  }
}
