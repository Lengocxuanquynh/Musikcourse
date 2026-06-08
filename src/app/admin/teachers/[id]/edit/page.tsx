import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { TeacherForm } from '@/components/admin/TeacherForm';

type Props = { params: Promise<{ id: string }> };

export default async function EditTeacherPage({ params }: Props) {
  const { id } = await params;
  const teacher = await db.teacher.findUnique({ where: { id } });
  if (!teacher) notFound();

  return (
    <>
      <AdminHeader title="Sửa giảng viên" description={teacher.name} />
      <div className="flex-1 overflow-auto p-8">
        <TeacherForm teacher={teacher} />
      </div>
    </>
  );
}
