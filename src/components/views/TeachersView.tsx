'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Award, Music, Star, Mail } from 'lucide-react';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import type { Teacher } from '@prisma/client';

type Props = {
  teachers: Teacher[];
};

export default function TeachersView({ teachers }: Props) {
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
            <h1 className="text-5xl mb-6">Đội ngũ giảng viên</h1>
            <p className="text-xl text-white/90">
              Đội ngũ giảng viên giàu kinh nghiệm, tận tâm và chuyên nghiệp.
              Tất cả đều tốt nghiệp từ các học viện âm nhạc uy tín trong và ngoài nước.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachers.map((teacher, index) => (
              <motion.div
                key={teacher.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border group"
              >
                <Link href={`/giang-vien/${teacher.slug}`} className="block">
                  <div className="relative h-80 overflow-hidden">
                    {teacher.image && (
                      <ImageWithFallback
                        src={teacher.image}
                        alt={teacher.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl mb-1">{teacher.name}</h3>
                      <p className="text-secondary">{teacher.title}</p>
                    </div>
                  </div>
                </Link>

                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Award className="w-4 h-4 text-secondary" />
                      <span>{teacher.experience}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{teacher.education}</p>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm text-primary mb-2">Chuyên môn:</h4>
                    <div className="flex flex-wrap gap-2">
                      {teacher.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="px-3 py-1 bg-accent text-primary rounded-full text-xs"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm text-primary mb-2">Thành tích nổi bật:</h4>
                    <ul className="space-y-1">
                      {teacher.achievements.slice(0, 2).map((achievement) => (
                        <li
                          key={achievement}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <Star className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`/giang-vien/${teacher.slug}`}
                    className="inline-block mt-4 text-secondary text-sm hover:text-primary transition-colors"
                  >
                    Xem hồ sơ chi tiết →
                  </Link>
                </div>
              </motion.div>
            ))}
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
            <h2 className="text-4xl text-primary mb-4">Tại sao chọn giảng viên của chúng tôi?</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Award,
                title: 'Chuyên môn cao',
                description: 'Tốt nghiệp từ các học viện âm nhạc uy tín',
              },
              {
                icon: Music,
                title: 'Kinh nghiệm thực tế',
                description: 'Nghệ sĩ biểu diễn và giảng dạy chuyên nghiệp',
              },
              {
                icon: Star,
                title: 'Tận tâm với học viên',
                description: 'Phương pháp giảng dạy phù hợp từng đối tượng',
              },
              {
                icon: Mail,
                title: 'Hỗ trợ liên tục',
                description: 'Tư vấn và giải đáp thắc mắc mọi lúc',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-full mb-4">
                  <feature.icon className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-lg text-primary mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
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
            <h2 className="text-4xl mb-6">Muốn học với giảng viên chuyên nghiệp?</h2>
            <p className="text-xl mb-8 text-white/90">
              Đăng ký ngay để được tư vấn và sắp xếp lịch học phù hợp
            </p>
            <Link
              href="/lien-he"
              className="inline-block px-8 py-4 bg-secondary text-primary rounded-lg hover:bg-secondary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Liên hệ tư vấn
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
