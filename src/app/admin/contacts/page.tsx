import { db } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { DataTable } from '@/components/admin/DataTable';
import { ContactActions } from '@/components/admin/ContactActions';

export default async function AdminContactsPage() {
  const contacts = await db.contactSubmission.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <>
      <AdminHeader
        title="Liên hệ"
        description="Danh sách yêu cầu liên hệ từ khách hàng"
      />
      <div className="flex-1 overflow-auto p-8">
        <DataTable
          data={contacts}
          keyField="id"
          emptyMessage="Chưa có liên hệ nào"
          columns={[
            { key: 'name', header: 'Họ tên' },
            { key: 'phone', header: 'Điện thoại' },
            { key: 'email', header: 'Email' },
            { key: 'course', header: 'Khóa học' },
            {
              key: 'message',
              header: 'Nội dung',
              render: (row) => (
                <span className="line-clamp-2 max-w-xs">
                  {(row.message as string) || '—'}
                </span>
              ),
            },
            {
              key: 'createdAt',
              header: 'Ngày gửi',
              render: (row) => formatDate(row.createdAt as Date),
            },
            {
              key: 'read',
              header: 'Trạng thái',
              render: (row) => (
                <ContactActions id={row.id as string} read={row.read as boolean} />
              ),
            },
          ]}
        />
      </div>
    </>
  );
}
