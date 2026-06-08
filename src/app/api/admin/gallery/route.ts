import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { gallerySchema } from '@/lib/validations';
import { requireSession, unauthorized, jsonError, zodError } from '@/lib/api-utils';

export async function GET() {
  const session = await requireSession();
  if (!session) return unauthorized();

  const images = await db.galleryImage.findMany({
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
  });

  return NextResponse.json(images);
}

export async function POST(request: Request) {
  const session = await requireSession();
  if (!session) return unauthorized();

  try {
    const body = await request.json();
    const parsed = gallerySchema.safeParse(body);
    if (!parsed.success) return zodError(parsed.error);

    const image = await db.galleryImage.create({
      data: parsed.data,
    });

    return NextResponse.json(image, { status: 201 });
  } catch {
    return jsonError('Thêm ảnh thất bại', 500);
  }
}
