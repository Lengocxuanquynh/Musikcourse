import type { Metadata } from 'next';
import { PostCategory } from '@prisma/client';
import { safeDbQuery } from '@/lib/safe-db';
import { buildMetadata } from '@/lib/seo';
import NewsView from '@/components/views/NewsView';
import type { Post } from '@prisma/client';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildMetadata({
  title: 'Tin tức & Kiến thức | Melody Music Center',
  description:
    'Cập nhật tin tức, kiến thức và sự kiện mới nhất về âm nhạc tại Melody Music Center.',
  path: '/tin-tuc',
});

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function NewsPage({ searchParams }: Props) {
  const { category: categoryParam } = await searchParams;

  const activeCategory =
    categoryParam && isValidCategory(categoryParam)
      ? (categoryParam as PostCategory)
      : null;

  const posts = await safeDbQuery(
    () =>
      import('@/lib/db').then(({ db }) =>
        db.post.findMany({
          where: {
            published: true,
            ...(activeCategory ? { category: activeCategory } : {}),
          },
          orderBy: { publishedAt: 'desc' },
        })
      ),
    getFallbackPosts(activeCategory)
  );

  const featuredPost =
    posts.find((p) => p.featured) ?? (!activeCategory ? posts[0] : null);

  return (
    <NewsView
      posts={posts}
      featuredPost={activeCategory ? null : featuredPost}
      activeCategory={activeCategory}
    />
  );
}

function isValidCategory(value: string): value is PostCategory {
  return Object.values(PostCategory).includes(value as PostCategory);
}

function getFallbackPosts(category: PostCategory | null): Post[] {
  const now = new Date();
  const all: Post[] = [
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
      content: '<h2>1. Luyện tập đều đặn mỗi ngày</h2><p>Dành ít nhất 30 phút mỗi ngày...</p>',
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
    {
      id: 'p3',
      title: 'Học viên Melody giành giải Nhất cuộc thi Guitar toàn quốc',
      slug: 'hoc-vien-gianh-giai-guitar',
      excerpt:
        'Chúc mừng học viên Nguyễn Văn An đã xuất sắc đạt giải Nhất tại cuộc thi Guitar toàn quốc 2026.',
      content: '<p>Chúc mừng học viên xuất sắc...</p>',
      coverImage: 'https://images.unsplash.com/photo-1758524944402-1903b38f848f?w=1080&q=80',
      coverImageId: null,
      category: PostCategory.ACHIEVEMENT,
      authorName: 'Ban Biên Tập',
      authorId: null,
      metaTitle: null,
      metaDescription: null,
      focusKeyword: null,
      published: true,
      featured: false,
      publishedAt: new Date('2026-05-05'),
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'p4',
      title: 'Buổi hòa nhạc "Đam mê Âm nhạc" thành công rực rỡ',
      slug: 'hoa-nhac-dam-me-am-nhac',
      excerpt: 'Hơn 500 khán giả đã đến tham dự buổi hòa nhạc của học viên Melody Music Center.',
      content: '<p>Buổi hòa nhạc đã diễn ra thành công...</p>',
      coverImage: 'https://images.unsplash.com/photo-1566913485242-694e995731b4?w=1080&q=80',
      coverImageId: null,
      category: PostCategory.EVENT,
      authorName: 'Ban Biên Tập',
      authorId: null,
      metaTitle: null,
      metaDescription: null,
      focusKeyword: null,
      published: true,
      featured: false,
      publishedAt: new Date('2026-04-20'),
      createdAt: now,
      updatedAt: now,
    },
  ];

  if (category) {
    return all.filter((p) => p.category === category);
  }

  return all;
}
