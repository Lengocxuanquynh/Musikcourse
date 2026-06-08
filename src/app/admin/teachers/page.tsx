import Link from 'next/link';
import { Plus } from 'lucide-react';
import { db } from '@/lib/db';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { DataTable } from '@/components/admin/DataTable';
import { DeleteButton } from '@/components/admin/DeleteButton';

export default async function AdminTeachersPage() {
  const teachers = await db.teacher.findMany({
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    select: {
      id: true,
      name: true,
      title: true,
      experience: true,
      published: true,
      sortOrder: true,
    },
  });

  return (
    <>
      <AdminHeader
        title="Giảng viên"
        description="Quản lý đội ngũ giảng viên"
        actions={
          <Link
            href="/admin/teachers/new"
            className="inline-flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Tạo mới
          </Link>
        }
      />
      <div className="flex-1 overflow-auto p-8">
        <DataTable
          data={teachers}
          keyField="id"
          columns={[
            { key: 'name', header: 'Họ tên' },
            { key: 'title', header: 'Chức danh' },
            { key: 'experience', header: 'Kinh nghiệm' },
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
                    href={`/admin/teachers/${row.id}/edit`}
                    className="text-sm text-primary hover:underline"
                  >
                    Sửa
                  </Link>
                  <DeleteButton
                    url={`/api/admin/teachers/${row.id}`}
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
