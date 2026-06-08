import { safeDbQuery } from '@/lib/safe-db';
import HomeView from '@/components/views/HomeView';

export const revalidate = 3600;

export default async function HomePage() {
  const courses = await safeDbQuery(
    () =>
      import('@/lib/db').then(({ db }) =>
        db.course.findMany({
          where: { published: true },
          orderBy: { sortOrder: 'asc' },
          take: 4,
        })
      ),
    getFallbackCourses()
  );

  return <HomeView courses={courses} />;
}

function getFallbackCourses() {
  return [
    {
      id: '1',
      name: 'Piano',
      slug: 'hoc-piano',
      description: 'Từ cơ bản đến nâng cao, phát triển kỹ thuật và cảm xúc âm nhạc',
      price: '1.500.000đ',
      duration: '8 buổi/tháng',
      students: '250+',
      level: 'Tất cả trình độ',
      features: [],
      image: 'https://images.unsplash.com/photo-1609196595770-10faedf23b7a?w=1080&q=80',
      imageId: null,
      icon: 'piano',
      content: null,
      published: true,
      sortOrder: 0,
      metaTitle: null,
      metaDescription: null,
      createdAt: new Date(),
      updatedAt: new Date(),
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
      features: [],
      image: 'https://images.unsplash.com/photo-1758524944402-1903b38f848f?w=1080&q=80',
      imageId: null,
      icon: 'guitar',
      content: null,
      published: true,
      sortOrder: 1,
      metaTitle: null,
      metaDescription: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      name: 'Violin',
      slug: 'hoc-violin',
      description: 'Phát triển kỹ thuật vận cung và âm sắc đặc trưng',
      price: '1.800.000đ',
      duration: '8 buổi/tháng',
      students: '100+',
      level: 'Cơ bản - Nâng cao',
      features: [],
      image: 'https://images.unsplash.com/photo-1566913485242-694e995731b4?w=1080&q=80',
      imageId: null,
      icon: 'violin',
      content: null,
      published: true,
      sortOrder: 2,
      metaTitle: null,
      metaDescription: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '4',
      name: 'Thanh nhạc',
      slug: 'hoc-thanh-nhac',
      description: 'Rèn luyện giọng hát, hơi thở và kỹ thuật thanh nhạc chuyên nghiệp',
      price: '1.300.000đ',
      duration: '8 buổi/tháng',
      students: '180+',
      level: 'Tất cả trình độ',
      features: [],
      image: 'https://images.unsplash.com/photo-1595335784560-7494c415ce45?w=1080&q=80',
      imageId: null,
      icon: 'vocal',
      content: null,
      published: true,
      sortOrder: 3,
      metaTitle: null,
      metaDescription: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
}
