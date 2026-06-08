import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://melodymusic.vn';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Melody Music Center';

type SeoParams = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path = '',
  image,
  type = 'website',
  publishedTime,
  noIndex = false,
}: SeoParams): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = image || `${SITE_URL}/og-default.jpg`;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'vi_VN',
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(publishedTime && type === 'article' ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function musicSchoolJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicSchool',
    name: SITE_NAME,
    url: SITE_URL,
    telephone: '+84-123-456-789',
    email: 'contact@melodymusic.vn',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Đường Âm Nhạc, Phường 10',
      addressLocality: 'Quận 1',
      addressRegion: 'TP. Hồ Chí Minh',
      addressCountry: 'VN',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
    },
  };
}

export function articleJsonLd(post: {
  title: string;
  excerpt: string;
  slug: string;
  coverImage?: string | null;
  authorName: string;
  publishedAt?: Date | null;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    author: { '@type': 'Person', name: post.authorName },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    datePublished: post.publishedAt?.toISOString(),
    mainEntityOfPage: `${SITE_URL}/tin-tuc/${post.slug}`,
  };
}

export function courseJsonLd(course: {
  name: string;
  description: string;
  slug: string;
  price: string;
  image?: string | null;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.name,
    description: course.description,
    url: `${SITE_URL}/khoa-hoc/${course.slug}`,
    provider: { '@type': 'Organization', name: SITE_NAME, sameAs: SITE_URL },
    image: course.image,
    offers: {
      '@type': 'Offer',
      price: course.price.replace(/[^\d]/g, '') || '0',
      priceCurrency: 'VND',
      availability: 'https://schema.org/InStock',
    },
  };
}

export const categoryLabels: Record<string, string> = {
  NEWS: 'Tin tức',
  KNOWLEDGE: 'Kiến thức',
  ACHIEVEMENT: 'Thành tích',
  EVENT: 'Sự kiện',
  COURSE: 'Khóa học',
  GUIDE: 'Hướng dẫn',
  EDUCATION: 'Giáo dục',
};

export const galleryCategoryLabels: Record<string, string> = {
  CLASSROOM: 'Lớp học',
  PERFORMANCE: 'Biểu diễn',
  EXTRACURRICULAR: 'Hoạt động ngoại khóa',
};
