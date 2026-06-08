'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Music } from 'lucide-react';

const navLinks = [
  { name: 'Trang chủ', path: '/' },
  { name: 'Giới thiệu', path: '/gioi-thieu' },
  { name: 'Khóa học', path: '/khoa-hoc' },
  { name: 'Giảng viên', path: '/giang-vien' },
  { name: 'Thư viện', path: '/thu-vien' },
  { name: 'Tin tức', path: '/tin-tuc' },
  { name: 'Liên hệ', path: '/lien-he' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) =>
    path === '/' ? pathname === '/' : pathname.startsWith(path);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-primary rounded-full p-2.5 group-hover:bg-secondary transition-colors duration-300">
              <Music className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">Melody Music Center</h1>
              <p className="text-xs text-muted-foreground">Khơi nguồn đam mê âm nhạc</p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive(link.path)
                    ? 'bg-secondary text-primary font-medium'
                    : 'text-foreground hover:bg-accent hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <Link
              href="/lien-he"
              className="px-6 py-3 bg-secondary text-primary rounded-lg hover:bg-secondary/90 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
            >
              Đăng ký ngay
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t border-border">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  isActive(link.path)
                    ? 'bg-secondary text-primary font-medium'
                    : 'text-foreground hover:bg-accent'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/lien-he"
              onClick={() => setIsOpen(false)}
              className="block text-center px-4 py-3 bg-secondary text-primary rounded-lg hover:bg-secondary/90 transition-colors font-medium"
            >
              Đăng ký ngay
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
