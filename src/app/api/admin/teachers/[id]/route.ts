import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { slugify } from '@/lib/seo';
import { deleteFromCloudinary } from '@/lib/cloudinary';
import { teacherSchema } from '@/lib/validations';
import { requireSession, unauthorized, jsonError, zodError } from '@/lib/api-utils';

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return unauthorized();

  const { id } = await params;
  const teacher = await db.teacher.findUnique({ where: { id } });
  if (!teacher) return jsonError('Không tìm thấy giảng viên', 404);

  return NextResponse.json(teacher);
}

export async function PUT(request: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return unauthorized();

  try {
    const { id } = await params;
    const existing = await db.teacher.findUnique({ where: { id } });
    if (!existing) return jsonError('Không tìm thấy giảng viên', 404);

    const body = await request.json();
    const parsed = teacherSchema.safeParse(body);
    if (!parsed.success) return zodError(parsed.error);

    const data = parsed.data;
    const slug = data.slug || slugify(data.name);

    if (slug !== existing.slug) {
      const slugTaken = await db.teacher.findUnique({ where: { slug } });
      if (slugTaken) return jsonError('Slug đã tồn tại');
    }

    if (existing.imageId && existing.imageId !== data.imageId) {
      await deleteFromCloudinary(existing.imageId);
    }

    const teacher = await db.teacher.update({
      where: { id },
      data: { ...data, slug },
    });

    return NextResponse.json(teacher);
  } catch {
    return jsonError('Cập nhật giảng viên thất bại', 500);
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return unauthorized();

  const { id } = await params;
  const existing = await db.teacher.findUnique({ where: { id } });
  if (!existing) return jsonError('Không tìm thấy giảng viên', 404);

  if (existing.imageId) {
    await deleteFromCloudinary(existing.imageId);
  }

  await db.teacher.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
