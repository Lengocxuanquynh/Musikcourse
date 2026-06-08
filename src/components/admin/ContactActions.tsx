'use client';

import { useRouter } from 'next/navigation';

type ContactActionsProps = {
  id: string;
  read: boolean;
};

export function ContactActions({ id, read }: ContactActionsProps) {
  const router = useRouter();

  async function toggleRead() {
    await fetch('/api/admin/contacts', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, read: !read }),
    });
    router.refresh();
  }

  return (
    <button
      onClick={toggleRead}
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
        read
          ? 'bg-muted text-muted-foreground'
          : 'bg-secondary/20 text-secondary-foreground'
      }`}
    >
      {read ? 'Đã đọc' : 'Chưa đọc'}
    </button>
  );
}
