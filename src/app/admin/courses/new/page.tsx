import { AdminHeader } from '@/components/admin/AdminHeader';
import { CourseForm } from '@/components/admin/CourseForm';

export default function NewCoursePage() {
  return (
    <>
      <AdminHeader title="Tạo khóa học mới" />
      <div className="flex-1 overflow-auto p-8">
        <CourseForm />
      </div>
    </>
  );
}
