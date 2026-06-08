'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ImageUpload } from './ImageUpload';
import type { Course } from '@prisma/client';

type CourseFormProps = {
  course?: Course;
};

const iconOptions = ['piano', 'guitar', 'violin', 'vocal', 'organ', 'ukulele', 'music'];

export function CourseForm({ course }: CourseFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [name, setName] = useState(course?.name ?? '');
  const [slug, setSlug] = useState(course?.slug ?? '');
  const [description, setDescription] = useState(course?.description ?? '');
  const [content, setContent] = useState(course?.content ?? '');
  const [price, setPrice] = useState(course?.price ?? '');
  const [duration, setDuration] = useState(course?.duration ?? '');
  const [students, setStudents] = useState(course?.students ?? '');
  const [level, setLevel] = useState(course?.level ?? '');
  const [features, setFeatures] = useState(course?.features.join('\n') ?? '');
  const [image, setImage] = useState(course?.image ?? null);
  const [imageId, setImageId] = useState(course?.imageId ?? null);
  const [icon, setIcon] = useState(course?.icon ?? 'piano');
  const [published, setPublished] = useState(course?.published ?? true);
  const [sortOrder, setSortOrder] = useState(course?.sortOrder ?? 0);
  const [metaTitle, setMetaTitle] = useState(course?.metaTitle ?? '');
  const [metaDescription, setMetaDescription] = useState(course?.metaDescription ?? '');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      name,
      slug: slug || undefined,
      description,
      content: content || null,
      price,
      duration,
      students: students || null,
      level: level || null,
      features: features.split('\n').map((f) => f.trim()).filter(Boolean),
      image,
      imageId,
      icon,
      published,
      sortOrder,
      metaTitle: metaTitle || null,
      metaDescription: metaDescription || null,
    };

    const url = course ? `/api/admin/courses/${course.id}` : '/api/admin/courses';
    const method = course ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Lưu thất bại');

      router.push('/admin/courses');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lưu thất bại');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      {error && (
        <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Tên khóa học *</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-lg border border-border bg-input-background px-3 py-2 text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Slug</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full rounded-lg border border-border bg-input-background px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Mô tả *</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={3}
          className="w-full rounded-lg border border-border bg-input-background px-3 py-2 text-sm"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Nội dung chi tiết</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          className="w-full rounded-lg border border-border bg-input-background px-3 py-2 text-sm"
        />
      </div>

      <ImageUpload
        value={image}
        publicId={imageId}
        onChange={(url, id) => {
          setImage(url);
          setImageId(id);
        }}
        label="Ảnh khóa học"
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-medium">Giá *</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="1.500.000đ"
            className="w-full rounded-lg border border-border bg-input-background px-3 py-2 text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Thời lượng *</label>
          <input
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
            placeholder="8 buổi/tháng"
            className="w-full rounded-lg border border-border bg-input-background px-3 py-2 text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Icon</label>
          <select
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            className="w-full rounded-lg border border-border bg-input-background px-3 py-2 text-sm"
          >
            {iconOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Số học viên</label>
          <input
            value={students}
            onChange={(e) => setStudents(e.target.value)}
            placeholder="250+"
            className="w-full rounded-lg border border-border bg-input-background px-3 py-2 text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Trình độ</label>
          <input
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full rounded-lg border border-border bg-input-background px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Đặc điểm (mỗi dòng một mục)</label>
        <textarea
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
          rows={5}
          className="w-full rounded-lg border border-border bg-input-background px-3 py-2 text-sm"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Meta title</label>
          <input
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
            className="w-full rounded-lg border border-border bg-input-background px-3 py-2 text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Thứ tự</label>
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            className="w-full rounded-lg border border-border bg-input-background px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Meta description</label>
        <textarea
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          rows={2}
          className="w-full rounded-lg border border-border bg-input-background px-3 py-2 text-sm"
        />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="rounded border-border"
        />
        Hiển thị công khai
      </label>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-secondary px-6 py-2.5 text-sm font-medium text-secondary-foreground hover:opacity-90 disabled:opacity-50"
        >
          {loading ? 'Đang lưu...' : course ? 'Cập nhật' : 'Tạo khóa học'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium hover:bg-muted"
        >
          Hủy
        </button>
      </div>
    </form>
  );
}
