import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(1, 'Mật khẩu không được để trống'),
});

export const contactSchema = z.object({
  name: z.string().min(1, 'Họ tên không được để trống'),
  phone: z.string().min(1, 'Số điện thoại không được để trống'),
  email: z.string().email('Email không hợp lệ'),
  course: z.string().optional(),
  ageGroup: z.string().optional(),
  message: z.string().optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
});

export const postSchema = z.object({
  title: z.string().min(1, 'Tiêu đề không được để trống'),
  slug: z.string().optional(),
  excerpt: z.string().min(1, 'Mô tả ngắn không được để trống'),
  content: z.string().min(1, 'Nội dung không được để trống'),
  coverImage: z.string().optional().nullable(),
  coverImageId: z.string().optional().nullable(),
  category: z.enum([
    'NEWS',
    'KNOWLEDGE',
    'ACHIEVEMENT',
    'EVENT',
    'COURSE',
    'GUIDE',
    'EDUCATION',
  ]),
  authorName: z.string().min(1, 'Tên tác giả không được để trống'),
  metaTitle: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable(),
  focusKeyword: z.string().optional().nullable(),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  publishedAt: z.string().optional().nullable(),
});

export const courseSchema = z.object({
  name: z.string().min(1, 'Tên khóa học không được để trống'),
  slug: z.string().optional(),
  description: z.string().min(1, 'Mô tả không được để trống'),
  content: z.string().optional().nullable(),
  price: z.string().min(1, 'Giá không được để trống'),
  duration: z.string().min(1, 'Thời lượng không được để trống'),
  students: z.string().optional().nullable(),
  level: z.string().optional().nullable(),
  features: z.array(z.string()).default([]),
  image: z.string().optional().nullable(),
  imageId: z.string().optional().nullable(),
  icon: z.string().default('piano'),
  published: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
  metaTitle: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable(),
});

export const teacherSchema = z.object({
  name: z.string().min(1, 'Tên không được để trống'),
  slug: z.string().optional(),
  title: z.string().min(1, 'Chức danh không được để trống'),
  experience: z.string().min(1, 'Kinh nghiệm không được để trống'),
  education: z.string().min(1, 'Học vấn không được để trống'),
  specialties: z.array(z.string()).default([]),
  achievements: z.array(z.string()).default([]),
  image: z.string().optional().nullable(),
  imageId: z.string().optional().nullable(),
  published: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});

export const gallerySchema = z.object({
  url: z.string().url('URL ảnh không hợp lệ'),
  publicId: z.string().optional().nullable(),
  caption: z.string().min(1, 'Chú thích không được để trống'),
  category: z.enum(['CLASSROOM', 'PERFORMANCE', 'EXTRACURRICULAR']),
  sortOrder: z.number().int().default(0),
  published: z.boolean().default(true),
});

export const contactMarkReadSchema = z.object({
  id: z.string().min(1),
  read: z.boolean(),
});
