import Link from 'next/link';
import { Music, MapPin, Phone, Mail, Facebook, Youtube, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-secondary rounded-full p-2">
                <Music className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg">Melody Music Center</h3>
            </div>
            <p className="text-white/80 mb-4">
              Trung tâm dạy nhạc uy tín với đội ngũ giảng viên chuyên nghiệp,
              cơ sở vật chất hiện đại, giúp bạn thực hiện ước mơ âm nhạc.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-secondary rounded-full flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-secondary rounded-full flex items-center justify-center transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-secondary rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Khóa học</h4>
            <ul className="space-y-2 text-white/80">
              <li><Link href="/khoa-hoc/hoc-piano" className="hover:text-secondary transition-colors">Piano</Link></li>
              <li><Link href="/khoa-hoc/hoc-guitar" className="hover:text-secondary transition-colors">Guitar</Link></li>
              <li><Link href="/khoa-hoc/hoc-organ" className="hover:text-secondary transition-colors">Organ</Link></li>
              <li><Link href="/khoa-hoc/hoc-violin" className="hover:text-secondary transition-colors">Violin</Link></li>
              <li><Link href="/khoa-hoc/hoc-ukulele" className="hover:text-secondary transition-colors">Ukulele</Link></li>
              <li><Link href="/khoa-hoc/hoc-thanh-nhac" className="hover:text-secondary transition-colors">Thanh nhạc</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Liên kết</h4>
            <ul className="space-y-2 text-white/80">
              <li><Link href="/gioi-thieu" className="hover:text-secondary transition-colors">Giới thiệu</Link></li>
              <li><Link href="/giang-vien" className="hover:text-secondary transition-colors">Đội ngũ giảng viên</Link></li>
              <li><Link href="/thu-vien" className="hover:text-secondary transition-colors">Thư viện ảnh</Link></li>
              <li><Link href="/tin-tuc" className="hover:text-secondary transition-colors">Tin tức</Link></li>
              <li><Link href="/lien-he" className="hover:text-secondary transition-colors">Liên hệ</Link></li>
              <li><Link href="/admin/login" className="hover:text-secondary transition-colors">Quản trị</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Liên hệ</h4>
            <ul className="space-y-3 text-white/80">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 flex-shrink-0 text-secondary" />
                <span>123 Đường Âm Nhạc, Quận 1, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 flex-shrink-0 text-secondary" />
                <span>0123 456 789</span>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 flex-shrink-0 text-secondary" />
                <span>contact@melodymusic.vn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/60">
          <p>&copy; 2026 Melody Music Center. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
