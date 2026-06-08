'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  GraduationCap,
  Users,
  Images,
  Mail,
  LogOut,
  Music,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/posts', label: 'Bài viết', icon: FileText },
  { href: '/admin/courses', label: 'Khóa học', icon: GraduationCap },
  { href: '/admin/teachers', label: 'Giảng viên', icon: Users },
  { href: '/admin/gallery', label: 'Thư viện', icon: Images },
  { href: '/admin/contacts', label: 'Liên hệ', icon: Mail },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <aside className="flex w-64 shrink-0 flex-col bg-primary text-primary-foreground">
      <div className="flex items-center gap-2 border-b border-white/10 px-6 py-5">
        <Music className="h-7 w-7 text-secondary" />
        <div>
          <p className="font-semibold">Musik Admin</p>
          <p className="text-xs text-white/60">Quản trị nội dung</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-secondary text-secondary-foreground'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-5 w-5" />
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}
