import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import AboutView from '@/components/views/AboutView';

export const metadata: Metadata = buildMetadata({
  title: 'Giới thiệu | Melody Music Center',
  description:
    'Tìm hiểu về Melody Music Center - trung tâm dạy nhạc hàng đầu với hơn 10 năm kinh nghiệm, sứ mệnh khơi nguồn đam mê âm nhạc.',
  path: '/gioi-thieu',
});

export default function AboutPage() {
  return <AboutView />;
}
