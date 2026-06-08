import type { Metadata } from 'next';
import { safeDbQuery } from '@/lib/safe-db';
import { buildMetadata } from '@/lib/seo';
import TeachersView from '@/components/views/TeachersView';
import type { Teacher } from '@prisma/client';

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: 'Giảng viên | Melody Music Center',
  description:
    'Đội ngũ giảng viên giàu kinh nghiệm, tốt nghiệp từ các học viện âm nhạc uy tín trong và ngoài nước tại Melody Music Center.',
  path: '/giang-vien',
});

export default async function TeachersPage() {
  const teachers = await safeDbQuery(
    () =>
      import('@/lib/db').then(({ db }) =>
        db.teacher.findMany({
          where: { published: true },
          orderBy: { sortOrder: 'asc' },
        })
      ),
    getFallbackTeachers()
  );

  return <TeachersView teachers={teachers} />;
}

function getFallbackTeachers(): Teacher[] {
  const now = new Date();
  return [
    {
      id: '1',
      name: 'Thầy Nguyễn Minh Tuấn',
      slug: 'nguyen-minh-tuan',
      title: 'Giảng viên Piano',
      experience: '15 năm kinh nghiệm',
      education: 'Thạc sĩ Âm nhạc - Học viện Âm nhạc Quốc gia Việt Nam',
      specialties: ['Classical Piano', 'Jazz Piano', 'Lý thuyết âm nhạc'],
      achievements: [
        'Giải Nhất Piano Quốc gia 2015',
        'Giảng viên xuất sắc 5 năm liền',
        'Hướng dẫn 50+ học viên đạt chứng chỉ quốc tế',
      ],
      image: 'https://images.unsplash.com/photo-1574281570877-bd815ebb50a4?w=1080&q=80',
      imageId: null,
      published: true,
      sortOrder: 0,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: '2',
      name: 'Cô Trần Thu Hà',
      slug: 'tran-thu-ha',
      title: 'Giảng viên Guitar',
      experience: '12 năm kinh nghiệm',
      education: 'Cử nhân Âm nhạc - Đại học Văn hóa TP.HCM',
      specialties: ['Acoustic Guitar', 'Classical Guitar', 'Fingerstyle'],
      achievements: [
        'Nghệ sĩ guitar nổi tiếng Việt Nam',
        'Tác giả 3 cuốn sách dạy guitar',
        '200+ học viên thành công',
      ],
      image: 'https://images.unsplash.com/photo-1615826622658-99ac210c7cca?w=1080&q=80',
      imageId: null,
      published: true,
      sortOrder: 1,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: '3',
      name: 'Thầy Lê Hoàng Nam',
      slug: 'le-hoang-nam',
      title: 'Giảng viên Violin',
      experience: '18 năm kinh nghiệm',
      education: 'Thạc sĩ Violin - Học viện Âm nhạc Paris, Pháp',
      specialties: ['Classical Violin', 'Orchestra', 'Chamber Music'],
      achievements: [
        'Violinist chính dàn nhạc giao hưởng',
        'Giải Ba cuộc thi Violin Châu Á 2012',
        'Chuyên gia đào tạo violin chuyên nghiệp',
      ],
      image: 'https://images.unsplash.com/photo-1566913485242-694e995731b4?w=1080&q=80',
      imageId: null,
      published: true,
      sortOrder: 2,
      createdAt: now,
      updatedAt: now,
    },
  ];
}
