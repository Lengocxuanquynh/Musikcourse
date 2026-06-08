import { PrismaClient, PostCategory, GalleryCategory } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const UNSPLASH = {
  piano: 'https://images.unsplash.com/photo-1609196595770-10faedf23b7a?w=1080&q=80',
  guitar: 'https://images.unsplash.com/photo-1758524944402-1903b38f848f?w=1080&q=80',
  violin: 'https://images.unsplash.com/photo-1566913485242-694e995731b4?w=1080&q=80',
  vocal: 'https://images.unsplash.com/photo-1595335784560-7494c415ce45?w=1080&q=80',
  organ: 'https://images.unsplash.com/photo-1655056853039-c0cb33a9c5b6?w=1080&q=80',
  ukulele: 'https://images.unsplash.com/photo-1758525864570-a78364675d0b?w=1080&q=80',
  teacher: 'https://images.unsplash.com/photo-1574281570877-bd815ebb50a4?w=1080&q=80',
  hero: 'https://images.unsplash.com/photo-1575314113965-c6672a42b99c?w=1080&q=80',
};

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@musik.vn';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.user.deleteMany({
    where: { email: { not: adminEmail }, role: 'ADMIN' },
  });

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash, name: 'Admin' },
    create: {
      email: adminEmail,
      name: 'Admin',
      passwordHash,
      role: 'ADMIN',
    },
  });

  const courses = [
    {
      name: 'Piano',
      slug: 'hoc-piano',
      description: 'Học piano từ cơ bản đến nâng cao với phương pháp giảng dạy hiện đại',
      price: '1.500.000đ',
      duration: '8 buổi/tháng',
      students: '250+',
      level: 'Tất cả trình độ',
      icon: 'piano',
      image: UNSPLASH.piano,
      features: ['Học lý thuyết âm nhạc cơ bản', 'Kỹ thuật bàn tay và tư thế', 'Đọc nốt nhạc và hợp âm', 'Thực hành với các bài tập đa dạng', 'Biểu diễn hàng tháng'],
      metaTitle: 'Học Piano Quận 1 | Melody Music Center',
      metaDescription: 'Khóa học Piano chuyên nghiệp tại TP.HCM. Giáo viên tốt nghiệp Học viện Âm nhạc, lớp 1-1 & nhóm.',
    },
    {
      name: 'Guitar',
      slug: 'hoc-guitar',
      description: 'Acoustic, Classic, Electric - Học từ những bài hát yêu thích',
      price: '1.200.000đ',
      duration: '8 buổi/tháng',
      students: '300+',
      level: 'Tất cả trình độ',
      icon: 'guitar',
      image: UNSPLASH.guitar,
      features: ['Kỹ thuật gảy và quét cơ bản', 'Hợp âm phổ biến', 'Đọc tablature và nốt nhạc', 'Học qua các bài hát thực tế', 'Fingerstyle và improvisation'],
      metaTitle: 'Học Guitar TP.HCM | Melody Music Center',
      metaDescription: 'Khóa học Guitar Acoustic, Classic, Electric cho mọi lứa tuổi.',
    },
    {
      name: 'Organ',
      slug: 'hoc-organ',
      description: 'Đàn organ điện tử với âm sắc phong phú và đa dạng',
      price: '1.300.000đ',
      duration: '8 buổi/tháng',
      students: '150+',
      level: 'Cơ bản - Trung cấp',
      icon: 'organ',
      image: UNSPLASH.organ,
      features: ['Làm quen với bàn phím đa tầng', 'Sử dụng các âm sắc khác nhau', 'Điều khiển nhịp tự động', 'Hòa âm cơ bản', 'Chơi nhạc đệm và solo'],
    },
    {
      name: 'Violin',
      slug: 'hoc-violin',
      description: 'Phát triển kỹ thuật vận cung và âm sắc đặc trưng',
      price: '1.800.000đ',
      duration: '8 buổi/tháng',
      students: '100+',
      level: 'Cơ bản - Nâng cao',
      icon: 'violin',
      image: UNSPLASH.violin,
      features: ['Tư thế cầm đàn chuẩn', 'Kỹ thuật vận cung cơ bản', 'Đọc nốt nhạc violin', 'Âm giai và bài tập kỹ thuật', 'Hòa tấu trong dàn nhạc'],
    },
    {
      name: 'Ukulele',
      slug: 'hoc-ukulele',
      description: 'Nhạc cụ nhỏ gọn, dễ học, phù hợp mọi lứa tuổi',
      price: '900.000đ',
      duration: '8 buổi/tháng',
      students: '200+',
      level: 'Cơ bản',
      icon: 'ukulele',
      image: UNSPLASH.ukulele,
      features: ['Cách cầm đàn và điệu nghệ đúng', 'Hợp âm cơ bản', 'Nhịp điệu strumming', 'Học qua các bài hát đơn giản', 'Kỹ thuật fingerpicking'],
    },
    {
      name: 'Thanh nhạc',
      slug: 'hoc-thanh-nhac',
      description: 'Rèn luyện giọng hát, hơi thở và kỹ thuật thanh nhạc chuyên nghiệp',
      price: '1.300.000đ',
      duration: '8 buổi/tháng',
      students: '180+',
      level: 'Tất cả trình độ',
      icon: 'vocal',
      image: UNSPLASH.vocal,
      features: ['Kỹ thuật hơi thở đúng cách', 'Phát triển âm vực', 'Rèn luyện giọng hát', 'Kỹ thuật thanh nhạc cơ bản', 'Biểu diễn trên sân khấu'],
    },
  ];

  for (const [i, course] of courses.entries()) {
    await prisma.course.upsert({
      where: { slug: course.slug },
      update: course,
      create: { ...course, sortOrder: i },
    });
  }

  const teachers = [
    {
      name: 'Thầy Nguyễn Minh Tuấn',
      slug: 'nguyen-minh-tuan',
      title: 'Giảng viên Piano',
      experience: '15 năm kinh nghiệm',
      education: 'Thạc sĩ Âm nhạc - Học viện Âm nhạc Quốc gia Việt Nam',
      specialties: ['Classical Piano', 'Jazz Piano', 'Lý thuyết âm nhạc'],
      achievements: ['Giải Nhất Piano Quốc gia 2015', 'Giảng viên xuất sắc 5 năm liền', 'Hướng dẫn 50+ học viên đạt chứng chỉ quốc tế'],
      image: UNSPLASH.teacher,
    },
    {
      name: 'Cô Trần Thu Hà',
      slug: 'tran-thu-ha',
      title: 'Giảng viên Guitar',
      experience: '12 năm kinh nghiệm',
      education: 'Cử nhân Âm nhạc - Đại học Văn hóa TP.HCM',
      specialties: ['Acoustic Guitar', 'Classical Guitar', 'Fingerstyle'],
      achievements: ['Nghệ sĩ guitar nổi tiếng Việt Nam', 'Tác giả 3 cuốn sách dạy guitar', '200+ học viên thành công'],
      image: UNSPLASH.guitar,
    },
    {
      name: 'Thầy Lê Hoàng Nam',
      slug: 'le-hoang-nam',
      title: 'Giảng viên Violin',
      experience: '18 năm kinh nghiệm',
      education: 'Thạc sĩ Violin - Học viện Âm nhạc Paris, Pháp',
      specialties: ['Classical Violin', 'Orchestra', 'Chamber Music'],
      achievements: ['Violinist chính dàn nhạc giao hưởng', 'Giải Ba cuộc thi Violin Châu Á 2012', 'Chuyên gia đào tạo violin chuyên nghiệp'],
      image: UNSPLASH.violin,
    },
    {
      name: 'Cô Phạm Mai Anh',
      slug: 'pham-mai-anh',
      title: 'Giảng viên Thanh nhạc',
      experience: '10 năm kinh nghiệm',
      education: 'Thạc sĩ Thanh nhạc - Nhạc viện TP.HCM',
      specialties: ['Thanh nhạc cổ điển', 'Pop Vocal', 'Kỹ thuật hơi thở'],
      achievements: ['Ca sĩ độc tấu chuyên nghiệp', 'Huấn luyện viên The Voice Kids', 'Học viên đạt nhiều giải thưởng quốc gia'],
      image: UNSPLASH.vocal,
    },
    {
      name: 'Thầy Võ Đức Huy',
      slug: 'vo-duc-huy',
      title: 'Giảng viên Guitar & Ukulele',
      experience: '8 năm kinh nghiệm',
      education: 'Cử nhân Guitar - Đại học Văn Hóa Nghệ Thuật',
      specialties: ['Electric Guitar', 'Ukulele', 'Pop & Rock'],
      achievements: ['Thành viên ban nhạc nổi tiếng', 'Chuyên gia guitar điện', 'Giảng viên trẻ được yêu thích nhất'],
      image: UNSPLASH.ukulele,
    },
    {
      name: 'Cô Đặng Thanh Thảo',
      slug: 'dang-thanh-thao',
      title: 'Giảng viên Organ',
      experience: '11 năm kinh nghiệm',
      education: 'Cử nhân Organ - Nhạc viện Hà Nội',
      specialties: ['Organ điện tử', 'Keyboard', 'Âm nhạc đại chúng'],
      achievements: ['Chuyên gia organ điện tử', 'Biểu diễn tại nhiều sự kiện lớn', 'Phương pháp giảng dạy sáng tạo'],
      image: UNSPLASH.organ,
    },
  ];

  for (const [i, teacher] of teachers.entries()) {
    await prisma.teacher.upsert({
      where: { slug: teacher.slug },
      update: teacher,
      create: { ...teacher, sortOrder: i },
    });
  }

  const posts = [
    {
      title: 'Melody Music Center khai trương cơ sở mới tại Quận 7',
      slug: 'khai-truong-co-so-quan-7',
      excerpt: 'Với diện tích 500m2, trang thiết bị hiện đại và không gian học tập sang trọng, cơ sở mới hứa hẹn mang đến trải nghiệm học tập tuyệt vời.',
      content: '<p>Melody Music Center chính thức khai trương cơ sở mới tại Quận 7...</p>',
      category: PostCategory.NEWS,
      authorName: 'Ban Biên Tập',
      coverImage: UNSPLASH.organ,
      featured: true,
      published: true,
      publishedAt: new Date('2026-05-15'),
      metaTitle: 'Khai trương cơ sở Quận 7 | Melody Music Center',
      focusKeyword: 'trung tâm dạy nhạc quận 7',
    },
    {
      title: '10 Tips học Piano hiệu quả cho người mới bắt đầu',
      slug: '10-tips-hoc-piano-hieu-qua',
      excerpt: 'Những lời khuyên hữu ích giúp bạn tiến bộ nhanh chóng khi mới bắt đầu học piano.',
      content: '<h2>1. Luyện tập đều đặn mỗi ngày</h2><p>Dành ít nhất 30 phút mỗi ngày...</p>',
      category: PostCategory.KNOWLEDGE,
      authorName: 'Thầy Nguyễn Minh Tuấn',
      coverImage: UNSPLASH.piano,
      published: true,
      publishedAt: new Date('2026-05-10'),
      focusKeyword: 'học piano hiệu quả',
    },
    {
      title: 'Cách lựa chọn đàn Guitar phù hợp cho người mới học',
      slug: 'cach-chon-dan-guitar-cho-nguoi-moi',
      excerpt: 'Hướng dẫn chi tiết giúp bạn chọn được cây đàn guitar phù hợp với nhu cầu và ngân sách.',
      content: '<p>Chọn đàn guitar là bước quan trọng đầu tiên...</p>',
      category: PostCategory.GUIDE,
      authorName: 'Cô Trần Thu Hà',
      coverImage: UNSPLASH.guitar,
      published: true,
      publishedAt: new Date('2026-04-28'),
      focusKeyword: 'chọn đàn guitar',
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }

  const galleryImages = [
    { caption: 'Lớp học Piano cho trẻ em', category: GalleryCategory.CLASSROOM, url: UNSPLASH.piano },
    { caption: 'Buổi học Guitar cá nhân', category: GalleryCategory.CLASSROOM, url: UNSPLASH.guitar },
    { caption: 'Buổi biểu diễn Violin', category: GalleryCategory.PERFORMANCE, url: UNSPLASH.violin },
    { caption: 'Học viên biểu diễn thanh nhạc', category: GalleryCategory.PERFORMANCE, url: UNSPLASH.vocal },
    { caption: 'Buổi giao lưu âm nhạc', category: GalleryCategory.EXTRACURRICULAR, url: UNSPLASH.hero },
    { caption: 'Workshop Guitar', category: GalleryCategory.EXTRACURRICULAR, url: UNSPLASH.ukulele },
  ];

  await prisma.galleryImage.deleteMany();
  for (const [i, img] of galleryImages.entries()) {
    await prisma.galleryImage.create({ data: { ...img, sortOrder: i } });
  }

  console.log('Seed completed!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
