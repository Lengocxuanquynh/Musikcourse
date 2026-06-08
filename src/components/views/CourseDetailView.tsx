'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Clock, Users, Award, CheckCircle2, ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { getCourseIcon } from '@/lib/icons';
import type { Course } from '@prisma/client';

type Props = {
  course: Course;
};

export default function CourseDetailView({ course }: Props) {
  const Icon = getCourseIcon(course.icon);

  return (
    <div>
      <section className="relative py-20 bg-gradient-to-br from-primary to-primary/90 text-white overflow-hidden">
        {course.image && (
          <div className="absolute inset-0 opacity-20">
            <ImageWithFallback
              src={course.image}
              alt={course.name}
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
              href="/khoa-hoc"
              className="inline-flex items-center gap-2 text-white/80 hover:text-secondary mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại danh sách khóa học
            </Link>
            <div className="flex items-start gap-4">
              <div className="bg-secondary rounded-full p-4 flex-shrink-0">
                <Icon className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl mb-4">{course.name}</h1>
                <p className="text-xl text-white/90 max-w-3xl">{course.description}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-secondary" />
              <div>
                <div className="text-sm text-muted-foreground">Thời lượng</div>
                <div className="text-primary font-medium">{course.duration}</div>
              </div>
            </div>
            {course.students && (
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-secondary" />
                <div>
                  <div className="text-sm text-muted-foreground">Học viên</div>
                  <div className="text-primary font-medium">{course.students}</div>
                </div>
              </div>
            )}
            {course.level && (
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-secondary" />
                <div>
                  <div className="text-sm text-muted-foreground">Trình độ</div>
                  <div className="text-primary font-medium">{course.level}</div>
                </div>
              </div>
            )}
            <div>
              <div className="text-sm text-muted-foreground">Học phí</div>
              <div className="text-2xl text-secondary font-medium">{course.price}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {course.image && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl"
              >
                <ImageWithFallback
                  src={course.image}
                  alt={course.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {course.features.length > 0 && (
                <>
                  <h2 className="text-3xl text-primary mb-6">Nội dung khóa học</h2>
                  <ul className="space-y-3 mb-8">
                    {course.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {course.content && (
                <div
                  className="prose prose-lg max-w-none text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: course.content }}
                />
              )}

              <Link
                href="/lien-he"
                className="inline-block mt-8 px-8 py-4 bg-secondary text-primary rounded-lg hover:bg-secondary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Đăng ký khóa học ngay
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl text-primary mb-4">Học thử miễn phí</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Đăng ký ngay để trải nghiệm buổi học đầu tiên hoàn toàn miễn phí
            </p>
            <Link
              href="/lien-he"
              className="inline-block px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300"
            >
              Liên hệ tư vấn
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
