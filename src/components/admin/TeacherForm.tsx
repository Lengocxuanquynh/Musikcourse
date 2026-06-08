'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ImageUpload } from './ImageUpload';
import type { Teacher } from '@prisma/client';

type TeacherFormProps = {
  teacher?: Teacher;
};

export function TeacherForm({ teacher }: TeacherFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [name, setName] = useState(teacher?.name ?? '');
  const [slug, setSlug] = useState(teacher?.slug ?? '');
  const [title, setTitle] = useState(teacher?.title ?? '');
  const [experience, setExperience] = useState(teacher?.experience ?? '');
  const [education, setEducation] = useState(teacher?.education ?? '');
  const [specialties, setSpecialties] = useState(teacher?.specialties.join('\n') ?? '');
  const [achievements, setAchievements] = useState(teacher?.achievements.join('\n') ?? '');
  const [image, setImage] = useState(teacher?.image ?? null);
  const [imageId, setImageId] = useState(teacher?.imageId ?? null);
  const [published, setPublished] = useState(teacher?.published ?? true);
  const [sortOrder, setSortOrder] = useState(teacher?.sortOrder ?? 0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      name,
      slug: slug || undefined,
      title,
      experience,
      education,
      specialties: specialties.split('\n').map((s) => s.trim()).filter(Boolean),
      achievements: achievements.split('\n').map((a) => a.trim()).filter(Boolean),
      image,
      imageId,
      published,
      sortOrder,
    };

    const url = teacher ? `/api/admin/teachers/${teacher.id}` : '/api/admin/teachers';
    const method = teacher ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Lưu thất bại');

      router.push('/admin/teachers');
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
          <label className="text-sm font-medium">Họ tên *</label>
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

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Chức danh *</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full rounded-lg border border-border bg-input-background px-3 py-2 text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Kinh nghiệm *</label>
          <input
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
            className="w-full rounded-lg border border-border bg-input-background px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Học vấn *</label>
        <input
          value={education}
          onChange={(e) => setEducation(e.target.value)}
          required
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
        label="Ảnh giảng viên"
      />

      <div className="space-y-2">
        <label className="text-sm font-medium">Chuyên môn (mỗi dòng một mục)</label>
        <textarea
          value={specialties}
          onChange={(e) => setSpecialties(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-border bg-input-background px-3 py-2 text-sm"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Thành tích (mỗi dòng một mục)</label>
        <textarea
          value={achievements}
          onChange={(e) => setAchievements(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-border bg-input-background px-3 py-2 text-sm"
        />
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Thứ tự</label>
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            className="w-24 rounded-lg border border-border bg-input-background px-3 py-2 text-sm"
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
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-secondary px-6 py-2.5 text-sm font-medium text-secondary-foreground hover:opacity-90 disabled:opacity-50"
        >
          {loading ? 'Đang lưu...' : teacher ? 'Cập nhật' : 'Tạo giảng viên'}
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
