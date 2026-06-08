import { db } from '@/lib/db';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { GalleryManager } from '@/components/admin/GalleryManager';

export default async function AdminGalleryPage() {
  const images = await db.galleryImage.findMany({
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
  });

  return (
    <>
      <AdminHeader
        title="Thư viện ảnh"
        description="Quản lý hình ảnh lớp học, biểu diễn và hoạt động"
      />
      <div className="flex-1 overflow-auto p-8">
        <GalleryManager images={images} />
      </div>
    </>
  );
}
