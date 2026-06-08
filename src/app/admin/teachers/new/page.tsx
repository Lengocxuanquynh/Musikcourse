import { AdminHeader } from '@/components/admin/AdminHeader';
import { TeacherForm } from '@/components/admin/TeacherForm';

export default function NewTeacherPage() {
  return (
    <>
      <AdminHeader title="Thêm giảng viên mới" />
      <div className="flex-1 overflow-auto p-8">
        <TeacherForm />
      </div>
    </>
  );
}
