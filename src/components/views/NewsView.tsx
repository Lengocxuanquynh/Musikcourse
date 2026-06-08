'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { categoryLabels } from '@/lib/seo';
import { formatDate } from '@/lib/utils';
import type { Post, PostCategory } from '@prisma/client';

type Props = {
  posts: Post[];
  featuredPost?: Post | null;
  activeCategory?: PostCategory | null;
};

const filterCategories: (PostCategory | null)[] = [
  null,
  'NEWS',
  'KNOWLEDGE',
  'ACHIEVEMENT',
  'EVENT',
  'COURSE',
];

export default function NewsView({ posts, featuredPost, activeCategory }: Props) {
  const featured = featuredPost ?? posts.find((p) => p.featured) ?? posts[0];
  const listPosts = featured
    ? posts.filter((p) => p.id !== featured.id)
    : posts;

  return (
    <div>
      <section className="relative py-20 bg-gradient-to-br from-primary to-primary/90 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl mb-6">Tin tức & Kiến thức</h1>
            <p className="text-xl text-white/90">
              Cập nhật tin tức mới nhất và chia sẻ kiến thức hữu ích về âm nhạc
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-8 mb-16"
            >
              <Link
                href={`/tin-tuc/${featured.slug}`}
                className="relative h-96 lg:h-auto min-h-[24rem] rounded-2xl overflow-hidden group block"
              >
                {featured.coverImage && (
                  <ImageWithFallback
                    src={featured.coverImage}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-secondary text-primary rounded-lg text-sm">
                    {categoryLabels[featured.category]}
                  </span>
                </div>
              </Link>

              <div className="flex flex-col justify-center">
                <Link href={`/tin-tuc/${featured.slug}`}>
                  <h2 className="text-3xl md:text-4xl text-primary mb-4 hover:text-secondary transition-colors">
                    {featured.title}
                  </h2>
                </Link>
                <p className="text-lg text-muted-foreground mb-6">{featured.excerpt}</p>
                <div className="flex items-center gap-6 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(featured.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{featured.authorName}</span>
                  </div>
                </div>
                <Link
                  href={`/tin-tuc/${featured.slug}`}
                  className="flex items-center gap-2 text-secondary hover:gap-3 transition-all duration-300 w-fit"
                >
                  Đọc thêm <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          )}

          <div className="mb-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {filterCategories.map((cat) => {
                const isActive = activeCategory === cat;
                const href = cat ? `/tin-tuc?category=${cat}` : '/tin-tuc';
                const label = cat ? categoryLabels[cat] : 'Tất cả';

                return (
                  <Link
                    key={cat ?? 'all'}
                    href={href}
                    className={`px-6 py-2 rounded-lg transition-colors duration-300 ${
                      isActive
                        ? 'bg-secondary text-primary'
                        : 'bg-muted text-foreground hover:bg-accent'
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
              >
                <Link href={`/tin-tuc/${post.slug}`} className="block">
                  <div className="relative h-48 overflow-hidden">
                    {post.coverImage && (
                      <ImageWithFallback
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-secondary/90 backdrop-blur-sm text-primary rounded-lg text-xs">
                        {categoryLabels[post.category]}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg text-primary mb-3 line-clamp-2 group-hover:text-secondary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-3 h-3" />
                        <span>{post.authorName}</span>
                      </div>
                    </div>
                    <span className="flex items-center gap-2 text-secondary text-sm group-hover:gap-3 transition-all duration-300">
                      Đọc thêm <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {listPosts.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              Chưa có bài viết nào trong danh mục này.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
