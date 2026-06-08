import Link from 'next/link';
import { Plus } from 'lucide-react';
import { db } from '@/lib/db';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { DataTable } from '@/components/admin/DataTable';
import { DeleteButton } from '@/components/admin/DeleteButton';

export default async function AdminCoursesPage() {
  const courses = await db.course.findMany({
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    select: {
      id: true,
      name: true,
      slug: true,
      price: true,
      duration: true,
      published: true,
      sortOrder: true,
    },
  });

  return (
    <>
      <AdminHeader
        title="Khóa học"
        description="Quản lý các khóa học âm nhạc"
        actions={
          <Link
            href="/admin/courses/new"
            className="inline-flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Tạo mới
          </Link>
        }
      />
      <div className="flex-1 overflow-auto p-8">
        <DataTable
          data={courses}
          keyField="id"
          columns={[
            { key: 'name', header: 'Tên khóa học' },
            { key: 'price', header: 'Giá' },
            { key: 'duration', header: 'Thời lượng' },
            { key: 'sortOrder', header: 'Thứ tự' },
            {
              key: 'published',
              header: 'Trạng thái',
              render: (row) => (row.published ? 'Công khai' : 'Ẩn'),
            },
            {
              key: 'actions',
              header: '',
              render: (row) => (
                <div className="flex items-center gap-3">
                  <Link
                    href={`/admin/courses/${row.id}/edit`}
                    className="text-sm text-primary hover:underline"
                  >
                    Sửa
                  </Link>
                  <DeleteButton
                    url={`/api/admin/courses/${row.id}`}
                    label="Xóa"
                  />
                </div>
              ),
            },
          ]}
        />
      </div>
    </>
  );
}
