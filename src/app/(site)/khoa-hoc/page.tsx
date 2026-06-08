import type { Metadata } from 'next';
import { safeDbQuery } from '@/lib/safe-db';
import { buildMetadata } from '@/lib/seo';
import CoursesView from '@/components/views/CoursesView';
import type { Course } from '@prisma/client';

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: 'Khóa học | Melody Music Center',
  description:
    'Khóa học Piano, Guitar, Violin, Thanh nhạc, Organ, Ukulele tại Melody Music Center. Chương trình phù hợp mọi lứa tuổi và trình độ.',
  path: '/khoa-hoc',
});

export default async function CoursesPage() {
  const courses = await safeDbQuery(
    () =>
      import('@/lib/db').then(({ db }) =>
        db.course.findMany({
          where: { published: true },
          orderBy: { sortOrder: 'asc' },
        })
      ),
    getFallbackCourses()
  );

  return <CoursesView courses={courses} />;
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
      id: '3',
      name: 'Organ',
      slug: 'hoc-organ',
      description: 'Đàn organ điện tử với âm sắc phong phú và đa dạng',
      price: '1.300.000đ',
      duration: '8 buổi/tháng',
      students: '150+',
      level: 'Cơ bản - Trung cấp',
      features: [
        'Làm quen với bàn phím đa tầng',
        'Sử dụng các âm sắc khác nhau',
        'Điều khiển nhịp tự động',
        'Hòa âm cơ bản',
        'Chơi nhạc đệm và solo',
      ],
      image: 'https://images.unsplash.com/photo-1655056853039-c0cb33a9c5b6?w=1080&q=80',
      imageId: null,
      icon: 'organ',
      content: null,
      published: true,
      sortOrder: 2,
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
      sortOrder: 3,
      metaTitle: null,
      metaDescription: null,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: '5',
      name: 'Ukulele',
      slug: 'hoc-ukulele',
      description: 'Nhạc cụ nhỏ gọn, dễ học, phù hợp mọi lứa tuổi',
      price: '900.000đ',
      duration: '8 buổi/tháng',
      students: '200+',
      level: 'Cơ bản',
      features: [
        'Cách cầm đàn và điệu nghệ đúng',
        'Hợp âm cơ bản',
        'Nhịp điệu strumming',
        'Học qua các bài hát đơn giản',
        'Kỹ thuật fingerpicking',
      ],
      image: 'https://images.unsplash.com/photo-1758525864570-a78364675d0b?w=1080&q=80',
      imageId: null,
      icon: 'ukulele',
      content: null,
      published: true,
      sortOrder: 4,
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
      sortOrder: 5,
      metaTitle: null,
      metaDescription: null,
      createdAt: now,
      updatedAt: now,
    },
  ];
}
