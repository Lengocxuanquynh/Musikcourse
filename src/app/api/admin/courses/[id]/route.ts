import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { slugify } from '@/lib/seo';
import { deleteFromCloudinary } from '@/lib/cloudinary';
import { courseSchema } from '@/lib/validations';
import { requireSession, unauthorized, jsonError, zodError } from '@/lib/api-utils';

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return unauthorized();

  const { id } = await params;
  const course = await db.course.findUnique({ where: { id } });
  if (!course) return jsonError('Không tìm thấy khóa học', 404);

  return NextResponse.json(course);
}

export async function PUT(request: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return unauthorized();

  try {
    const { id } = await params;
    const existing = await db.course.findUnique({ where: { id } });
    if (!existing) return jsonError('Không tìm thấy khóa học', 404);

    const body = await request.json();
    const parsed = courseSchema.safeParse(body);
    if (!parsed.success) return zodError(parsed.error);

    const data = parsed.data;
    const slug = data.slug || slugify(data.name);

    if (slug !== existing.slug) {
      const slugTaken = await db.course.findUnique({ where: { slug } });
      if (slugTaken) return jsonError('Slug đã tồn tại');
    }

    if (existing.imageId && existing.imageId !== data.imageId) {
      await deleteFromCloudinary(existing.imageId);
    }

    const course = await db.course.update({
      where: { id },
      data: { ...data, slug },
    });

    return NextResponse.json(course);
  } catch {
    return jsonError('Cập nhật khóa học thất bại', 500);
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return unauthorized();

  const { id } = await params;
  const existing = await db.course.findUnique({ where: { id } });
  if (!existing) return jsonError('Không tìm thấy khóa học', 404);

  if (existing.imageId) {
    await deleteFromCloudinary(existing.imageId);
  }

  await db.course.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
