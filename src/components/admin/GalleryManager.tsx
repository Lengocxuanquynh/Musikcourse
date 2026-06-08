'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { ImageUpload } from './ImageUpload';
import { galleryCategoryLabels } from '@/lib/seo';
import type { GalleryImage } from '@prisma/client';

type GalleryManagerProps = {
  images: GalleryImage[];
};

const categories = Object.keys(galleryCategoryLabels) as Array<
  keyof typeof galleryCategoryLabels
>;

export function GalleryManager({ images: initialImages }: GalleryManagerProps) {
  const router = useRouter();
  const [images, setImages] = useState(initialImages);
  const [url, setUrl] = useState<string | null>(null);
  const [publicId, setPublicId] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState<string>('CLASSROOM');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!url || !caption) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, publicId, caption, category }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Thêm ảnh thất bại');

      setImages((prev) => [data, ...prev]);
      setUrl(null);
      setPublicId(null);
      setCaption('');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Thêm ảnh thất bại');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Xóa ảnh này?')) return;

    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Xóa thất bại');
      }

      setImages((prev) => prev.filter((img) => img.id !== id));
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Xóa thất bại');
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleAdd} className="rounded-lg border border-border bg-card p-6 space-y-4">
        <h2 className="font-semibold text-foreground">Thêm ảnh mới</h2>
        {error && (
          <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <ImageUpload
          value={url}
          publicId={publicId}
          onChange={(u, id) => {
            setUrl(u);
            setPublicId(id);
          }}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Chú thích *</label>
            <input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              required
              className="w-full rounded-lg border border-border bg-input-background px-3 py-2 text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Danh mục</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-border bg-input-background px-3 py-2 text-sm"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {galleryCategoryLabels[cat]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !url}
          className="rounded-lg bg-secondary px-6 py-2.5 text-sm font-medium text-secondary-foreground hover:opacity-90 disabled:opacity-50"
        >
          {loading ? 'Đang thêm...' : 'Thêm ảnh'}
        </button>
      </form>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img) => (
          <div
            key={img.id}
            className="group relative overflow-hidden rounded-lg border border-border bg-card"
          >
            <Image
              src={img.url}
              alt={img.caption}
              width={400}
              height={300}
              className="h-48 w-full object-cover"
            />
            <div className="p-3">
              <p className="text-sm font-medium text-foreground">{img.caption}</p>
              <p className="text-xs text-muted-foreground">
                {galleryCategoryLabels[img.category]}
              </p>
            </div>
            <button
              onClick={() => handleDelete(img.id)}
              className="absolute right-2 top-2 rounded-lg bg-destructive p-2 text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <p className="text-center text-muted-foreground">Chưa có ảnh nào</p>
      )}
    </div>
  );
}
