import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { slugify } from '@/lib/seo';
import { courseSchema } from '@/lib/validations';
import { requireSession, unauthorized, jsonError, zodError } from '@/lib/api-utils';

export async function GET() {
  const session = await requireSession();
  if (!session) return unauthorized();

  const courses = await db.course.findMany({
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
  });

  return NextResponse.json(courses);
}

export async function POST(request: Request) {
  const session = await requireSession();
  if (!session) return unauthorized();

  try {
    const body = await request.json();
    const parsed = courseSchema.safeParse(body);
    if (!parsed.success) return zodError(parsed.error);

    const data = parsed.data;
    const slug = data.slug || slugify(data.name);

    const existing = await db.course.findUnique({ where: { slug } });
    if (existing) return jsonError('Slug đã tồn tại');

    const course = await db.course.create({
      data: { ...data, slug },
    });

    return NextResponse.json(course, { status: 201 });
  } catch {
    return jsonError('Tạo khóa học thất bại', 500);
  }
}
