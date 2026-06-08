import Link from 'next/link';
import {
  FileText,
  GraduationCap,
  Users,
  Images,
  Mail,
  Newspaper,
} from 'lucide-react';
import { db } from '@/lib/db';
import { AdminHeader } from '@/components/admin/AdminHeader';

export default async function AdminDashboardPage() {
  const [posts, courses, teachers, gallery, contacts, unreadContacts, subscribers] =
    await Promise.all([
      db.post.count(),
      db.course.count(),
      db.teacher.count(),
      db.galleryImage.count(),
      db.contactSubmission.count(),
      db.contactSubmission.count({ where: { read: false } }),
      db.newsletterSubscriber.count(),
    ]);

  const stats = [
    { label: 'Bài viết', value: posts, href: '/admin/posts', icon: FileText },
    { label: 'Khóa học', value: courses, href: '/admin/courses', icon: GraduationCap },
    { label: 'Giảng viên', value: teachers, href: '/admin/teachers', icon: Users },
    { label: 'Thư viện ảnh', value: gallery, href: '/admin/gallery', icon: Images },
    {
      label: 'Liên hệ',
      value: contacts,
      sub: unreadContacts > 0 ? `${unreadContacts} chưa đọc` : undefined,
      href: '/admin/contacts',
      icon: Mail,
    },
    { label: 'Newsletter', value: subscribers, href: '#', icon: Newspaper },
  ];

  return (
    <>
      <AdminHeader
        title="Dashboard"
        description="Tổng quan nội dung website"
      />
      <div className="flex-1 overflow-auto p-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const content = (
              <div className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md">
                <div className="flex items-center justify-between">
                  <div className="rounded-lg bg-primary/5 p-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-3xl font-bold text-foreground">
                    {stat.value}
                  </span>
                </div>
                <p className="mt-4 font-medium text-foreground">{stat.label}</p>
                {stat.sub && (
                  <p className="text-sm text-secondary">{stat.sub}</p>
                )}
              </div>
            );

            return stat.href !== '#' ? (
              <Link key={stat.label} href={stat.href}>
                {content}
              </Link>
            ) : (
              <div key={stat.label}>{content}</div>
            );
          })}
        </div>
      </div>
    </>
  );
}
