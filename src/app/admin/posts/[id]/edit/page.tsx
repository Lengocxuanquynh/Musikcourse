import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { PostForm } from '@/components/admin/PostForm';

type Props = { params: Promise<{ id: string }> };

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  const post = await db.post.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <>
      <AdminHeader title="Sửa bài viết" description={post.title} />
      <div className="flex-1 overflow-auto p-8">
        <PostForm post={post} />
      </div>
    </>
  );
}
