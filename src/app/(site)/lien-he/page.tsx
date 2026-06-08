import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import ContactView from '@/components/views/ContactView';

export const metadata: Metadata = buildMetadata({
  title: 'Liên hệ | Melody Music Center',
  description:
    'Liên hệ Melody Music Center để được tư vấn khóa học Piano, Guitar, Violin, Thanh nhạc. Học thử miễn phí.',
  path: '/lien-he',
});

export default function ContactPage() {
  return <ContactView />;
}
