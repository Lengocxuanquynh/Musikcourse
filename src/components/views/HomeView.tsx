'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Users, GraduationCap, Award, Music, Star } from 'lucide-react';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { getCourseIcon } from '@/lib/icons';
import type { Course } from '@prisma/client';

type Props = {
  courses: Course[];
};

export default function HomeView({ courses }: Props) {
  const stats = [
    { icon: Users, label: 'Học viên', value: '1000+' },
    { icon: GraduationCap, label: 'Giảng viên', value: '20+' },
    { icon: Award, label: 'Năm kinh nghiệm', value: '10+' },
    { icon: Music, label: 'Khóa học', value: '15+' },
  ];

  const testimonials = [
    {
      name: 'Nguyễn Minh Anh',
      role: 'Học viên Piano',
      content: 'Môi trường học tập chuyên nghiệp, giáo viên nhiệt tình và tận tâm. Con tôi đã tiến bộ rất nhiều sau 6 tháng học tại đây.',
      rating: 5,
    },
    {
      name: 'Trần Văn Hùng',
      role: 'Học viên Guitar',
      content: 'Cơ sở vật chất hiện đại, phương pháp giảng dạy dễ hiểu. Tôi đã có thể tự chơi những bản nhạc yêu thích chỉ sau 3 tháng.',
      rating: 5,
    },
    {
      name: 'Lê Thu Hà',
      role: 'Học viên Violin',
      content: 'Trung tâm rất chuyên nghiệp từ cách tổ chức lớp học đến chương trình đào tạo. Tôi rất hài lòng với sự lựa chọn của mình.',
      rating: 5,
    },
  ];

  const heroImage =
    'https://images.unsplash.com/photo-1575314113965-c6672a42b99c?w=1080&q=80';

  return (
    <div>
      <section className="relative h-[600px] bg-gradient-to-br from-primary via-primary/95 to-primary/90 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <ImageWithFallback
            src={heroImage}
            alt="Học viên âm nhạc"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-5xl md:text-6xl mb-6 font-medium">
              Khơi nguồn đam mê âm nhạc
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Nơi ước mơ âm nhạc trở thành hiện thực. Học tập với đội ngũ giảng viên chuyên nghiệp,
              phương pháp giảng dạy hiện đại và cơ sở vật chất đẳng cấp.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/lien-he"
                className="px-8 py-4 bg-secondary text-primary rounded-lg hover:bg-secondary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Đăng ký học thử miễn phí
              </Link>
              <Link
                href="/khoa-hoc"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-lg hover:bg-white/20 transition-all duration-300"
              >
                Xem khóa học
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-secondary" />
                </div>
                <div className="text-3xl md:text-4xl text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-primary mb-4">Khóa học nổi bật</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Đa dạng khóa học với chương trình giảng dạy được thiết kế phù hợp cho mọi lứa tuổi và trình độ
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.slice(0, 4).map((course, index) => {
              const Icon = getCourseIcon(course.icon);
              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    {course.image && (
                      <ImageWithFallback
                        src={course.image}
                        alt={course.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-secondary rounded-full p-2">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl text-primary mb-2">{course.name}</h3>
                    <p className="text-muted-foreground mb-4 text-sm">{course.description}</p>
                    <div className="flex justify-between items-center mb-4 text-sm">
                      <span className="text-primary">{course.price}</span>
                      <span className="text-muted-foreground">{course.duration}</span>
                    </div>
                    <Link
                      href={`/khoa-hoc/${course.slug}`}
                      className="block text-center px-4 py-2 bg-accent text-primary rounded-lg hover:bg-secondary transition-colors duration-300"
                    >
                      Đăng ký ngay
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/khoa-hoc"
              className="inline-block px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Xem tất cả khóa học
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-primary mb-4">Video giới thiệu</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Khám phá không gian học tập và hoạt động sôi nổi tại Melody Music Center
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-muted">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Melody Music Center - Video giới thiệu"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-primary mb-4">Học viên nói về chúng tôi</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic">&ldquo;{t.content}&rdquo;</p>
                <div className="text-primary">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary to-primary/90 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl mb-4">Đăng ký tư vấn miễn phí</h2>
          <p className="text-xl text-white/90 mb-8">
            Để lại thông tin, chúng tôi sẽ liên hệ tư vấn khóa học phù hợp nhất cho bạn
          </p>
          <Link
            href="/lien-he"
            className="inline-block px-8 py-4 bg-secondary text-primary rounded-lg hover:bg-secondary/90 transition-colors duration-300 shadow-lg"
          >
            Liên hệ ngay
          </Link>
        </div>
      </section>
    </div>
  );
}
