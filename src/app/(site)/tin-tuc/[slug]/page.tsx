import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PostCategory } from '@prisma/client';
import { db } from '@/lib/db';
import { buildMetadata, articleJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import PostDetailView from '@/components/views/PostDetailView';
import type { Post } from '@prisma/client';

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  if (!process.env.DATABASE_URL) {
    return getFallbackPosts().map((p) => ({ slug: p.slug }));
  }
  try {
    const posts = await db.post.findMany({
      where: { published: true },
      select: { slug: true },
    });
    if (posts.length > 0) return posts;
  } catch {
    // db unavailable at build time
  }

  return getFallbackPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return buildMetadata({
      title: 'Bài viết không tìm thấy | Melody Music Center',
      description: 'Bài viết không tồn tại.',
      path: `/tin-tuc/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: post.metaTitle || `${post.title} | Melody Music Center`,
    description: post.metaDescription || post.excerpt,
    path: `/tin-tuc/${post.slug}`,
    image: post.coverImage || undefined,
    type: 'article',
    publishedTime: post.publishedAt?.toISOString(),
  });
}

export default async function PostDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      <JsonLd data={articleJsonLd(post)} />
      <PostDetailView post={post} />
    </>
  );
}

async function getPostBySlug(slug: string): Promise<Post | null> {
  if (process.env.DATABASE_URL) {
    try {
      const post = await db.post.findFirst({
        where: { slug, published: true },
      });
      if (post) return post;
    } catch {
      // fall through to fallback
    }
  }

  return getFallbackPosts().find((p) => p.slug === slug) ?? null;
}

function getFallbackPosts(): Post[] {
  const now = new Date();
  return [
    {
      id: 'p1',
      title: 'Melody Music Center khai trương cơ sở mới tại Quận 7',
      slug: 'khai-truong-co-so-quan-7',
      excerpt:
        'Với diện tích 500m2, trang thiết bị hiện đại và không gian học tập sang trọng, cơ sở mới hứa hẹn mang đến trải nghiệm học tập tuyệt vời.',
      content: '<p>Melody Music Center chính thức khai trương cơ sở mới tại Quận 7...</p>',
      coverImage: 'https://images.unsplash.com/photo-1655056853039-c0cb33a9c5b6?w=1080&q=80',
      coverImageId: null,
      category: PostCategory.NEWS,
      authorName: 'Ban Biên Tập',
      authorId: null,
      metaTitle: null,
      metaDescription: null,
      focusKeyword: null,
      published: true,
      featured: true,
      publishedAt: new Date('2026-05-15'),
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'p2',
      title: '10 Tips học Piano hiệu quả cho người mới bắt đầu',
      slug: '10-tips-hoc-piano-hieu-qua',
      excerpt:
        'Những lời khuyên hữu ích giúp bạn tiến bộ nhanh chóng khi mới bắt đầu học piano.',
      content:
        '<h2>1. Luyện tập đều đặn mỗi ngày</h2><p>Dành ít nhất 30 phút mỗi ngày để luyện tập piano sẽ giúp bạn tiến bộ nhanh chóng.</p><h2>2. Học lý thuyết song song</h2><p>Hiểu nốt nhạc và hợp âm giúp bạn chơi đàn tự tin hơn.</p>',
      coverImage: 'https://images.unsplash.com/photo-1609196595770-10faedf23b7a?w=1080&q=80',
      coverImageId: null,
      category: PostCategory.KNOWLEDGE,
      authorName: 'Thầy Nguyễn Minh Tuấn',
      authorId: null,
      metaTitle: null,
      metaDescription: null,
      focusKeyword: null,
      published: true,
      featured: false,
      publishedAt: new Date('2026-05-10'),
      createdAt: now,
      updatedAt: now,
    },
  ];
}
