'use client';

import { motion } from 'motion/react';
import { Target, Eye, Award, Users, Heart, Star, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from '@/components/ImageWithFallback';

const values = [
  {
    icon: Heart,
    title: 'Đam mê âm nhạc',
    description:
      'Chúng tôi tin rằng âm nhạc là ngôn ngữ của trái tim, giúp kết nối con người với nhau',
  },
  {
    icon: Star,
    title: 'Chất lượng đào tạo',
    description: 'Cam kết mang đến chương trình giảng dạy chuyên nghiệp, bài bản và hiệu quả',
  },
  {
    icon: Users,
    title: 'Tận tâm với học viên',
    description: 'Đồng hành cùng học viên trên con đường chinh phục ước mơ âm nhạc',
  },
  {
    icon: TrendingUp,
    title: 'Phát triển bền vững',
    description: 'Không ngừng đổi mới, cải tiến để mang đến trải nghiệm học tập tốt nhất',
  },
];

const facilities = [
  {
    name: 'Phòng học Piano',
    description: 'Trang bị đàn Piano cao cấp, cách âm tốt, điều hòa nhiệt độ',
    image:
      'https://images.unsplash.com/photo-1655056853039-c0cb33a9c5b6?w=1080&q=80',
  },
  {
    name: 'Phòng học Guitar',
    description: 'Đa dạng loại guitar, ampli và thiết bị hỗ trợ chuyên nghiệp',
    image:
      'https://images.unsplash.com/photo-1758525864570-a78364675d0b?w=1080&q=80',
  },
  {
    name: 'Phòng thu âm',
    description: 'Studio thu âm hiện đại để học viên thực hành và ghi âm',
    image:
      'https://images.unsplash.com/photo-1595335784560-7494c415ce45?w=1080&q=80',
  },
  {
    name: 'Phòng hòa tấu',
    description: 'Không gian rộng rãi cho các buổi hòa tấu và biểu diễn',
    image:
      'https://images.unsplash.com/photo-1566913485268-1287f67f87fe?w=1080&q=80',
  },
];

const milestones = [
  {
    year: '2016',
    title: 'Thành lập',
    description: 'Ra đời với 5 giảng viên và 50 học viên đầu tiên',
  },
  {
    year: '2018',
    title: 'Mở rộng',
    description: 'Khai trương cơ sở thứ 2, tăng số lượng khóa học',
  },
  {
    year: '2020',
    title: 'Chuyển đổi số',
    description: 'Triển khai hệ thống học online và quản lý hiện đại',
  },
  {
    year: '2023',
    title: 'Giải thưởng',
    description: 'Nhận danh hiệu "Trung tâm dạy nhạc xuất sắc"',
  },
  {
    year: '2026',
    title: 'Hiện tại',
    description: 'Hơn 1000 học viên và 20+ giảng viên chuyên nghiệp',
  },
];

export default function AboutView() {
  return (
    <div>
      <section className="relative py-20 bg-gradient-to-br from-primary to-primary/90 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.2),transparent_50%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl mb-6">Về Melody Music Center</h1>
            <p className="text-xl text-white/90">
              Với hơn 10 năm kinh nghiệm, chúng tôi tự hào là một trong những trung tâm dạy nhạc
              hàng đầu, giúp hàng ngàn học viên thực hiện ước mơ âm nhạc của mình.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-8 h-8 text-secondary" />
                <h2 className="text-3xl text-primary">Sứ mệnh</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                Melody Music Center ra đời với sứ mệnh khơi nguồn đam mê âm nhạc, giúp mọi người từ
                trẻ em đến người lớn có thể tiếp cận và phát triển tài năng âm nhạc một cách chuyên nghiệp
                và hiệu quả nhất.
              </p>
              <p className="text-lg text-muted-foreground">
                Chúng tôi tin rằng âm nhạc không chỉ là một kỹ năng mà còn là công cụ giúp phát triển
                tư duy, cảm xúc và kết nối con người với nhau. Mỗi học viên đến với chúng tôi đều được
                tôn trọng và phát triển theo con đường riêng của mình.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-8 h-8 text-secondary" />
                <h2 className="text-3xl text-primary">Tầm nhìn</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                Trở thành trung tâm dạy nhạc hàng đầu Việt Nam, được công nhận bởi chất lượng đào tạo
                xuất sắc, phương pháp giảng dạy tiên tiến và môi trường học tập chuyên nghiệp.
              </p>
              <p className="text-lg text-muted-foreground">
                Trong 5 năm tới, chúng tôi hướng tới việc mở rộng mạng lưới cơ sở đào tạo, phát triển
                các chương trình học online chất lượng cao và xây dựng cộng đồng yêu âm nhạc ngày càng
                lớn mạnh.
              </p>
            </motion.div>
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
            <h2 className="text-4xl text-primary mb-4">Giá trị cốt lõi</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Những giá trị định hướng mọi hoạt động của chúng tôi
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-full mb-4">
                  <value.icon className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl text-primary mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl text-primary mb-4">Cơ sở vật chất</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Trang thiết bị hiện đại, đạt chuẩn quốc tế
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {facilities.map((facility, index) => (
              <motion.div
                key={facility.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-muted rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={facility.image}
                    alt={facility.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl mb-2">{facility.name}</h3>
                    <p className="text-white/90">{facility.description}</p>
                  </div>
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
            <h2 className="text-4xl text-primary mb-4">Hành trình phát triển</h2>
            <p className="text-lg text-muted-foreground">
              Những cột mốc quan trọng trong 10 năm qua
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-secondary/30 hidden md:block" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
                      <div className="text-3xl text-secondary mb-2">{milestone.year}</div>
                      <h3 className="text-xl text-primary mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center justify-center w-16 h-16 bg-secondary rounded-full text-primary z-10 flex-shrink-0">
                    <Award className="w-8 h-8" />
                  </div>
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
