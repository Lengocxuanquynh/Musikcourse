'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Award, Star, ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import type { Teacher } from '@prisma/client';

type Props = {
  teacher: Teacher;
};

export default function TeacherDetailView({ teacher }: Props) {
  return (
    <div>
      <section className="relative py-20 bg-gradient-to-br from-primary to-primary/90 text-white overflow-hidden">
        {teacher.image && (
          <div className="absolute inset-0 opacity-15">
            <ImageWithFallback
              src={teacher.image}
              alt={teacher.name}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        )}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/giang-vien"
              className="inline-flex items-center gap-2 text-white/80 hover:text-secondary mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại danh sách giảng viên
            </Link>
            <h1 className="text-4xl md:text-5xl mb-2">{teacher.name}</h1>
            <p className="text-xl text-secondary">{teacher.title}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {teacher.image && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-1"
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                  <ImageWithFallback
                    src={teacher.image}
                    alt={teacher.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={teacher.image ? 'lg:col-span-2' : 'lg:col-span-3'}
            >
              <div className="mb-8">
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <Award className="w-5 h-5 text-secondary" />
                  <span className="text-lg">{teacher.experience}</span>
                </div>
                <p className="text-lg text-muted-foreground">{teacher.education}</p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl text-primary mb-4">Chuyên môn</h2>
                <div className="flex flex-wrap gap-3">
                  {teacher.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-4 py-2 bg-accent text-primary rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl text-primary mb-4">Thành tích nổi bật</h2>
                <ul className="space-y-3">
                  {teacher.achievements.map((achievement) => (
                    <li key={achievement} className="flex items-start gap-3">
                      <Star className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/lien-he"
                className="inline-block px-8 py-4 bg-secondary text-primary rounded-lg hover:bg-secondary/90 transition-all duration-300 shadow-lg"
              >
                Đăng ký học với giảng viên này
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
