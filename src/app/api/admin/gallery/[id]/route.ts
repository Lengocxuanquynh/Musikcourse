import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { deleteFromCloudinary } from '@/lib/cloudinary';
import { requireSession, unauthorized, jsonError } from '@/lib/api-utils';

type Params = { params: Promise<{ id: string }> };

export async function DELETE(_request: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return unauthorized();

  const { id } = await params;
  const existing = await db.galleryImage.findUnique({ where: { id } });
  if (!existing) return jsonError('Không tìm thấy ảnh', 404);

  if (existing.publicId) {
    await deleteFromCloudinary(existing.publicId);
  }

  await db.galleryImage.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
