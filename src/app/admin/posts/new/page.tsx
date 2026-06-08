import { AdminHeader } from '@/components/admin/AdminHeader';
import { PostForm } from '@/components/admin/PostForm';

export default function NewPostPage() {
  return (
    <>
      <AdminHeader title="Tạo bài viết mới" />
      <div className="flex-1 overflow-auto p-8">
        <PostForm />
      </div>
    </>
  );
}
