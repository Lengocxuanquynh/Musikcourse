import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { buildMetadata } from '@/lib/seo';
import TeacherDetailView from '@/components/views/TeacherDetailView';
import type { Teacher } from '@prisma/client';

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  if (!process.env.DATABASE_URL) {
    return getFallbackTeachers().map((t) => ({ slug: t.slug }));
  }
  try {
    const teachers = await db.teacher.findMany({
      where: { published: true },
      select: { slug: true },
    });
    if (teachers.length > 0) return teachers;
  } catch {
    // db unavailable at build time
  }

  return getFallbackTeachers().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const teacher = await getTeacherBySlug(slug);

  if (!teacher) {
    return buildMetadata({
      title: 'Giảng viên không tìm thấy | Melody Music Center',
      description: 'Giảng viên không tồn tại.',
      path: `/giang-vien/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `${teacher.name} - ${teacher.title} | Melody Music Center`,
    description: `${teacher.name}, ${teacher.title}. ${teacher.experience}. ${teacher.education}`,
    path: `/giang-vien/${teacher.slug}`,
    image: teacher.image || undefined,
  });
}

export default async function TeacherDetailPage({ params }: Props) {
  const { slug } = await params;
  const teacher = await getTeacherBySlug(slug);

  if (!teacher) notFound();

  return <TeacherDetailView teacher={teacher} />;
}

async function getTeacherBySlug(slug: string): Promise<Teacher | null> {
  if (process.env.DATABASE_URL) {
    try {
      const teacher = await db.teacher.findFirst({
        where: { slug, published: true },
      });
      if (teacher) return teacher;
    } catch {
      // fall through to fallback
    }
  }

  return getFallbackTeachers().find((t) => t.slug === slug) ?? null;
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
