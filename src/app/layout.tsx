import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { buildMetadata, musicSchoolJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';

const inter = Inter({ subsets: ['latin', 'vietnamese'] });

export const metadata: Metadata = buildMetadata({
  title: 'Melody Music Center | Trung tâm dạy nhạc uy tín TP.HCM',
  description:
    'Melody Music Center - Trung tâm dạy Piano, Guitar, Violin, Thanh nhạc chuyên nghiệp tại TP.HCM. Học thử miễn phí, giảng viên giàu kinh nghiệm.',
  path: '/',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <JsonLd data={musicSchoolJsonLd()} />
        {children}
      </body>
    </html>
  );
}
