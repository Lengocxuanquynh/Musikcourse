import type { Metadata } from 'next';
import { GalleryCategory } from '@prisma/client';
import { safeDbQuery } from '@/lib/safe-db';
import { buildMetadata, galleryCategoryLabels } from '@/lib/seo';
import GalleryView, { type GalleryGroup } from '@/components/views/GalleryView';

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: 'Thư viện ảnh | Melody Music Center',
  description:
    'Khám phá hình ảnh lớp học, biểu diễn và hoạt động ngoại khóa tại Melody Music Center.',
  path: '/thu-vien',
});

const categoryOrder: GalleryCategory[] = [
  GalleryCategory.CLASSROOM,
  GalleryCategory.PERFORMANCE,
  GalleryCategory.EXTRACURRICULAR,
];

export default async function GalleryPage() {
  const images = await safeDbQuery(
    () =>
      import('@/lib/db').then(({ db }) =>
        db.galleryImage.findMany({
          where: { published: true },
          orderBy: { sortOrder: 'asc' },
        })
      ),
    getFallbackGalleryImages()
  );

  const galleries: GalleryGroup[] = categoryOrder
    .map((category) => {
      const categoryImages = images.filter((img) => img.category === category);
      if (categoryImages.length === 0) return null;

      return {
        category,
        label: galleryCategoryLabels[category],
        images: categoryImages.map((img) => ({
          id: img.id,
          url: img.url,
          caption: img.caption,
        })),
      };
    })
    .filter((g): g is GalleryGroup => g !== null);

  return <GalleryView galleries={galleries} />;
}

function getFallbackGalleryImages() {
  const now = new Date();
  return [
    {
      id: 'g1',
      url: 'https://images.unsplash.com/photo-1609196595770-10faedf23b7a?w=1080&q=80',
      publicId: null,
      caption: 'Lớp học Piano cho trẻ em',
      category: GalleryCategory.CLASSROOM,
      sortOrder: 0,
      published: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'g2',
      url: 'https://images.unsplash.com/photo-1758524944402-1903b38f848f?w=1080&q=80',
      publicId: null,
      caption: 'Buổi học Guitar cá nhân',
      category: GalleryCategory.CLASSROOM,
      sortOrder: 1,
      published: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'g3',
      url: 'https://images.unsplash.com/photo-1566913485242-694e995731b4?w=1080&q=80',
      publicId: null,
      caption: 'Buổi biểu diễn Violin',
      category: GalleryCategory.PERFORMANCE,
      sortOrder: 2,
      published: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'g4',
      url: 'https://images.unsplash.com/photo-1595335784560-7494c415ce45?w=1080&q=80',
      publicId: null,
      caption: 'Học viên biểu diễn thanh nhạc',
      category: GalleryCategory.PERFORMANCE,
      sortOrder: 3,
      published: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'g5',
      url: 'https://images.unsplash.com/photo-1575314113965-c6672a42b99c?w=1080&q=80',
      publicId: null,
      caption: 'Buổi giao lưu âm nhạc',
      category: GalleryCategory.EXTRACURRICULAR,
      sortOrder: 4,
      published: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'g6',
      url: 'https://images.unsplash.com/photo-1758525864570-a78364675d0b?w=1080&q=80',
      publicId: null,
      caption: 'Workshop Guitar',
      category: GalleryCategory.EXTRACURRICULAR,
      sortOrder: 5,
      published: true,
      createdAt: now,
      updatedAt: now,
    },
  ];
}
