import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { slugify } from '@/lib/seo';
import { deleteFromCloudinary } from '@/lib/cloudinary';
import { postSchema } from '@/lib/validations';
import { requireSession, unauthorized, jsonError, zodError } from '@/lib/api-utils';

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return unauthorized();

  const { id } = await params;
  const post = await db.post.findUnique({ where: { id } });
  if (!post) return jsonError('Không tìm thấy bài viết', 404);

  return NextResponse.json(post);
}

export async function PUT(request: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return unauthorized();

  try {
    const { id } = await params;
    const existing = await db.post.findUnique({ where: { id } });
    if (!existing) return jsonError('Không tìm thấy bài viết', 404);

    const body = await request.json();
    const parsed = postSchema.safeParse(body);
    if (!parsed.success) return zodError(parsed.error);

    const data = parsed.data;
    const slug = data.slug || slugify(data.title);

    if (slug !== existing.slug) {
      const slugTaken = await db.post.findUnique({ where: { slug } });
      if (slugTaken) return jsonError('Slug đã tồn tại');
    }

    if (existing.coverImageId && existing.coverImageId !== data.coverImageId) {
      await deleteFromCloudinary(existing.coverImageId);
    }

    const post = await db.post.update({
      where: { id },
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage,
        coverImageId: data.coverImageId,
        category: data.category,
        authorName: data.authorName,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        focusKeyword: data.focusKeyword,
        published: data.published,
        featured: data.featured,
        publishedAt: data.publishedAt
          ? new Date(data.publishedAt)
          : data.published && !existing.publishedAt
            ? new Date()
            : existing.publishedAt,
      },
    });

    return NextResponse.json(post);
  } catch {
    return jsonError('Cập nhật bài viết thất bại', 500);
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return unauthorized();

  const { id } = await params;
  const existing = await db.post.findUnique({ where: { id } });
  if (!existing) return jsonError('Không tìm thấy bài viết', 404);

  if (existing.coverImageId) {
    await deleteFromCloudinary(existing.coverImageId);
  }

  await db.post.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
