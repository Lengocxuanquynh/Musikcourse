'use client';

import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

type DeleteButtonProps = {
  url: string;
  label?: string;
};

export function DeleteButton({ url, label = 'Xóa' }: DeleteButtonProps) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm(`Bạn có chắc muốn ${label.toLowerCase()}?`)) return;

    const res = await fetch(url, { method: 'DELETE' });
    if (!res.ok) {
      const data = await res.json();
      alert(data.error || 'Xóa thất bại');
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="inline-flex items-center gap-1 text-sm text-destructive hover:underline"
    >
      <Trash2 className="h-4 w-4" />
      {label}
    </button>
  );
}
