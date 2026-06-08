import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { slugify } from '@/lib/seo';
import { postSchema } from '@/lib/validations';
import { requireSession, unauthorized, jsonError, zodError } from '@/lib/api-utils';

export async function GET() {
  const session = await requireSession();
  if (!session) return unauthorized();

  const posts = await db.post.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      category: true,
      authorName: true,
      published: true,
      featured: true,
      publishedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const session = await requireSession();
  if (!session) return unauthorized();

  try {
    const body = await request.json();
    const parsed = postSchema.safeParse(body);
    if (!parsed.success) return zodError(parsed.error);

    const data = parsed.data;
    const slug = data.slug || slugify(data.title);

    const existing = await db.post.findUnique({ where: { slug } });
    if (existing) return jsonError('Slug đã tồn tại');

    const post = await db.post.create({
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage,
        coverImageId: data.coverImageId,
        category: data.category,
        authorName: data.authorName,
        authorId: session.id,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        focusKeyword: data.focusKeyword,
        published: data.published,
        featured: data.featured,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : data.published ? new Date() : null,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch {
    return jsonError('Tạo bài viết thất bại', 500);
  }
}
