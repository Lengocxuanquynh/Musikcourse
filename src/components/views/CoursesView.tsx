'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Clock, Users, Award, CheckCircle2 } from 'lucide-react';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { getCourseIcon } from '@/lib/icons';
import type { Course } from '@prisma/client';

type Props = {
  courses: Course[];
};

export default function CoursesView({ courses }: Props) {
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
            <h1 className="text-5xl mb-6">Khóa học của chúng tôi</h1>
            <p className="text-xl text-white/90">
              Đa dạng khóa học với chương trình giảng dạy được thiết kế phù hợp cho mọi lứa tuổi và trình độ.
              Học viên được tự do lựa chọn nhạc cụ yêu thích và phát triển theo đam mê.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {courses.map((course, index) => {
              const Icon = getCourseIcon(course.icon);
              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border"
                >
                  <div className="grid md:grid-cols-2">
                    <Link
                      href={`/khoa-hoc/${course.slug}`}
                      className="relative h-64 md:h-full min-h-[16rem] overflow-hidden block"
                    >
                      {course.image && (
                        <ImageWithFallback
                          src={course.image}
                          alt={course.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          className="object-cover hover:scale-110 transition-transform duration-500"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <div className="bg-secondary rounded-full p-3">
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                      </div>
                    </Link>

                    <div className="p-6 flex flex-col">
                      <div className="mb-4">
                        <Link href={`/khoa-hoc/${course.slug}`}>
                          <h3 className="text-2xl text-primary mb-2 hover:text-secondary transition-colors">
                            {course.name}
                          </h3>
                        </Link>
                        <p className="text-muted-foreground">{course.description}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-secondary" />
                          <span className="text-muted-foreground">{course.duration}</span>
                        </div>
                        {course.students && (
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-secondary" />
                            <span className="text-muted-foreground">{course.students} học viên</span>
                          </div>
                        )}
                        {course.level && (
                          <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-secondary" />
                            <span className="text-muted-foreground">{course.level}</span>
                          </div>
                        )}
                        <div className="text-primary">{course.price}</div>
                      </div>

                      {course.features.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-sm text-primary mb-2">Nội dung khóa học:</h4>
                          <ul className="space-y-1">
                            {course.features.map((feature) => (
                              <li
                                key={feature}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="mt-auto flex flex-col gap-2">
                        <Link
                          href="/lien-he"
                          className="block text-center px-6 py-3 bg-secondary text-primary rounded-lg hover:bg-secondary/90 transition-colors duration-300"
                        >
                          Đăng ký ngay
                        </Link>
                        <Link
                          href={`/khoa-hoc/${course.slug}`}
                          className="block text-center px-6 py-2 text-secondary hover:text-primary transition-colors text-sm"
                        >
                          Xem chi tiết →
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl text-primary mb-4">Ưu đãi đặc biệt</h2>
            <p className="text-lg text-muted-foreground">
              Chương trình khuyến mãi hấp dẫn cho học viên mới
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl text-primary mb-2">Học thử miễn phí</h3>
              <p className="text-muted-foreground mb-4">
                1 buổi học thử miễn phí cho học viên mới đăng ký
              </p>
              <div className="text-2xl text-secondary">FREE</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-secondary to-secondary/90 rounded-2xl p-8 text-center text-primary shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl mb-2">Giảm 20%</h3>
              <p className="mb-4">Đăng ký khóa học 6 tháng, nhận ngay ưu đãi 20%</p>
              <div className="text-2xl">-20%</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl text-primary mb-2">Ưu đãi nhóm</h3>
              <p className="text-muted-foreground mb-4">
                Đăng ký từ 2 người trở lên, giảm 15% học phí
              </p>
              <div className="text-2xl text-secondary">-15%</div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary to-primary/90 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl mb-6">Sẵn sàng bắt đầu hành trình âm nhạc?</h2>
            <p className="text-xl mb-8 text-white/90">
              Đăng ký ngay hôm nay để nhận ưu đãi học thử miễn phí
            </p>
            <Link
              href="/lien-he"
              className="inline-block px-8 py-4 bg-secondary text-primary rounded-lg hover:bg-secondary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Đăng ký tư vấn miễn phí
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
