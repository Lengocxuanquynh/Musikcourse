import Link from 'next/link';
import { Plus } from 'lucide-react';
import { db } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import { categoryLabels } from '@/lib/seo';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { DataTable } from '@/components/admin/DataTable';
import { DeleteButton } from '@/components/admin/DeleteButton';

export default async function AdminPostsPage() {
  const posts = await db.post.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      category: true,
      published: true,
      featured: true,
      publishedAt: true,
      createdAt: true,
    },
  });

  return (
    <>
      <AdminHeader
        title="Bài viết"
        description="Quản lý tin tức và bài viết"
        actions={
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Tạo mới
          </Link>
        }
      />
      <div className="flex-1 overflow-auto p-8">
        <DataTable
          data={posts}
          keyField="id"
          columns={[
            { key: 'title', header: 'Tiêu đề' },
            {
              key: 'category',
              header: 'Danh mục',
              render: (row) => categoryLabels[row.category as string] ?? row.category,
            },
            {
              key: 'published',
              header: 'Trạng thái',
              render: (row) => (
                <span
                  className={
                    row.published
                      ? 'text-green-600'
                      : 'text-muted-foreground'
                  }
                >
                  {row.published ? 'Đã xuất bản' : 'Nháp'}
                  {row.featured ? ' · Nổi bật' : ''}
                </span>
              ),
            },
            {
              key: 'publishedAt',
              header: 'Ngày',
              render: (row) =>
                formatDate(row.publishedAt as Date) ||
                formatDate(row.createdAt as Date),
            },
            {
              key: 'actions',
              header: '',
              render: (row) => (
                <div className="flex items-center gap-3">
                  <Link
                    href={`/admin/posts/${row.id}/edit`}
                    className="text-sm text-primary hover:underline"
                  >
                    Sửa
                  </Link>
                  <DeleteButton
                    url={`/api/admin/posts/${row.id}`}
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
