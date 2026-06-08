import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { contactSchema } from '@/lib/validations';
import { jsonError, zodError } from '@/lib/api-utils';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) return zodError(parsed.error);

    const submission = await db.contactSubmission.create({
      data: parsed.data,
    });

    return NextResponse.json({ success: true, id: submission.id }, { status: 201 });
  } catch {
    return jsonError('Gửi liên hệ thất bại', 500);
  }
}
