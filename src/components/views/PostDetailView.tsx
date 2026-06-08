'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { categoryLabels } from '@/lib/seo';
import { formatDate } from '@/lib/utils';
import type { Post } from '@prisma/client';

type Props = {
  post: Post;
};

export default function PostDetailView({ post }: Props) {
  return (
    <div>
      <section className="relative py-20 bg-gradient-to-br from-primary to-primary/90 text-white overflow-hidden">
        {post.coverImage && (
          <div className="absolute inset-0 opacity-20">
            <ImageWithFallback
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        )}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/tin-tuc"
              className="inline-flex items-center gap-2 text-white/80 hover:text-secondary mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại tin tức
            </Link>
            <span className="inline-block px-4 py-2 bg-secondary text-primary rounded-lg text-sm mb-4">
              {categoryLabels[post.category]}
            </span>
            <h1 className="text-3xl md:text-5xl mb-6">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.authorName}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {post.coverImage && (
        <section className="py-8 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
              />
            </div>
          </div>
        </section>
      )}

      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none prose-headings:text-primary prose-a:text-secondary"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground mb-6">
            Quan tâm đến khóa học âm nhạc? Liên hệ với chúng tôi để được tư vấn miễn phí.
          </p>
          <Link
            href="/lien-he"
            className="inline-block px-8 py-4 bg-secondary text-primary rounded-lg hover:bg-secondary/90 transition-colors duration-300"
          >
            Liên hệ tư vấn
          </Link>
        </div>
      </section>
    </div>
  );
}
