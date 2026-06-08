import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { CourseForm } from '@/components/admin/CourseForm';

type Props = { params: Promise<{ id: string }> };

export default async function EditCoursePage({ params }: Props) {
  const { id } = await params;
  const course = await db.course.findUnique({ where: { id } });
  if (!course) notFound();

  return (
    <>
      <AdminHeader title="Sửa khóa học" description={course.name} />
      <div className="flex-1 overflow-auto p-8">
        <CourseForm course={course} />
      </div>
    </>
  );
}
