import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { contactMarkReadSchema } from '@/lib/validations';
import { requireSession, unauthorized, jsonError, zodError } from '@/lib/api-utils';

export async function GET() {
  const session = await requireSession();
  if (!session) return unauthorized();

  const contacts = await db.contactSubmission.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(contacts);
}

export async function PATCH(request: Request) {
  const session = await requireSession();
  if (!session) return unauthorized();

  try {
    const body = await request.json();
    const parsed = contactMarkReadSchema.safeParse(body);
    if (!parsed.success) return zodError(parsed.error);

    const contact = await db.contactSubmission.update({
      where: { id: parsed.data.id },
      data: { read: parsed.data.read },
    });

    return NextResponse.json(contact);
  } catch {
    return jsonError('Cập nhật trạng thái thất bại', 500);
  }
}
