import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { slugify } from '@/lib/seo';
import { teacherSchema } from '@/lib/validations';
import { requireSession, unauthorized, jsonError, zodError } from '@/lib/api-utils';

export async function GET() {
  const session = await requireSession();
  if (!session) return unauthorized();

  const teachers = await db.teacher.findMany({
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
  });

  return NextResponse.json(teachers);
}

export async function POST(request: Request) {
  const session = await requireSession();
  if (!session) return unauthorized();

  try {
    const body = await request.json();
    const parsed = teacherSchema.safeParse(body);
    if (!parsed.success) return zodError(parsed.error);

    const data = parsed.data;
    const slug = data.slug || slugify(data.name);

    const existing = await db.teacher.findUnique({ where: { slug } });
    if (existing) return jsonError('Slug đã tồn tại');

    const teacher = await db.teacher.create({
      data: { ...data, slug },
    });

    return NextResponse.json(teacher, { status: 201 });
  } catch {
    return jsonError('Tạo giảng viên thất bại', 500);
  }
}
