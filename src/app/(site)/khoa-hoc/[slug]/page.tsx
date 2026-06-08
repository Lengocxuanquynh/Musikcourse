import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { buildMetadata, courseJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import CourseDetailView from '@/components/views/CourseDetailView';
import type { Course } from '@prisma/client';

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  if (!process.env.DATABASE_URL) {
    return getFallbackCourses().map((c) => ({ slug: c.slug }));
  }
  try {
    const courses = await db.course.findMany({
      where: { published: true },
      select: { slug: true },
    });
    if (courses.length > 0) return courses;
  } catch {
    // db unavailable at build time
  }

  return getFallbackCourses().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    return buildMetadata({
      title: 'Khóa học không tìm thấy | Melody Music Center',
      description: 'Khóa học không tồn tại.',
      path: `/khoa-hoc/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: course.metaTitle || `${course.name} | Melody Music Center`,
    description: course.metaDescription || course.description,
    path: `/khoa-hoc/${course.slug}`,
    image: course.image || undefined,
  });
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) notFound();

  return (
    <>
      <JsonLd data={courseJsonLd(course)} />
      <CourseDetailView course={course} />
    </>
  );
}

async function getCourseBySlug(slug: string): Promise<Course | null> {
  if (process.env.DATABASE_URL) {
    try {
      const course = await db.course.findFirst({
        where: { slug, published: true },
      });
      if (course) return course;
    } catch {
      // fall through to fallback
    }
  }

  return getFallbackCourses().find((c) => c.slug === slug) ?? null;
}

function getFallbackCourses(): Course[] {
  const now = new Date();
  return [
    {
      id: '1',
      name: 'Piano',
      slug: 'hoc-piano',
      description: 'Học piano từ cơ bản đến nâng cao với phương pháp giảng dạy hiện đại',
      price: '1.500.000đ',
      duration: '8 buổi/tháng',
      students: '250+',
      level: 'Tất cả trình độ',
      features: [
        'Học lý thuyết âm nhạc cơ bản',
        'Kỹ thuật bàn tay và tư thế',
        'Đọc nốt nhạc và hợp âm',
        'Thực hành với các bài tập đa dạng',
        'Biểu diễn hàng tháng',
      ],
      image: 'https://images.unsplash.com/photo-1609196595770-10faedf23b7a?w=1080&q=80',
      imageId: null,
      icon: 'piano',
      content: null,
      published: true,
      sortOrder: 0,
      metaTitle: null,
      metaDescription: null,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: '2',
      name: 'Guitar',
      slug: 'hoc-guitar',
      description: 'Acoustic, Classic, Electric - Học từ những bài hát yêu thích',
      price: '1.200.000đ',
      duration: '8 buổi/tháng',
      students: '300+',
      level: 'Tất cả trình độ',
      features: [
        'Kỹ thuật gảy và quét cơ bản',
        'Hợp âm phổ biến',
        'Đọc tablature và nốt nhạc',
        'Học qua các bài hát thực tế',
        'Fingerstyle và improvisation',
      ],
      image: 'https://images.unsplash.com/photo-1758524944402-1903b38f848f?w=1080&q=80',
      imageId: null,
      icon: 'guitar',
      content: null,
      published: true,
      sortOrder: 1,
      metaTitle: null,
      metaDescription: null,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: '4',
      name: 'Violin',
      slug: 'hoc-violin',
      description: 'Phát triển kỹ thuật vận cung và âm sắc đặc trưng',
      price: '1.800.000đ',
      duration: '8 buổi/tháng',
      students: '100+',
      level: 'Cơ bản - Nâng cao',
      features: [
        'Tư thế cầm đàn chuẩn',
        'Kỹ thuật vận cung cơ bản',
        'Đọc nốt nhạc violin',
        'Âm giai và bài tập kỹ thuật',
        'Hòa tấu trong dàn nhạc',
      ],
      image: 'https://images.unsplash.com/photo-1566913485242-694e995731b4?w=1080&q=80',
      imageId: null,
      icon: 'violin',
      content: null,
      published: true,
      sortOrder: 2,
      metaTitle: null,
      metaDescription: null,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: '6',
      name: 'Thanh nhạc',
      slug: 'hoc-thanh-nhac',
      description: 'Rèn luyện giọng hát, hơi thở và kỹ thuật thanh nhạc chuyên nghiệp',
      price: '1.300.000đ',
      duration: '8 buổi/tháng',
      students: '180+',
      level: 'Tất cả trình độ',
      features: [
        'Kỹ thuật hơi thở đúng cách',
        'Phát triển âm vực',
        'Rèn luyện giọng hát',
        'Kỹ thuật thanh nhạc cơ bản',
        'Biểu diễn trên sân khấu',
      ],
      image: 'https://images.unsplash.com/photo-1595335784560-7494c415ce45?w=1080&q=80',
      imageId: null,
      icon: 'vocal',
      content: null,
      published: true,
      sortOrder: 3,
      metaTitle: null,
      metaDescription: null,
      createdAt: now,
      updatedAt: now,
    },
  ];
}
