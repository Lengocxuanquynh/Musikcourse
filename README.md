# Melody Music Center — Next.js

Website trung tâm dạy nhạc với Next.js 16, Prisma + Neon PostgreSQL, Cloudinary, SSR/SSG, và Admin CMS.

## Kiến trúc rendering

| Module | Route | Rendering |
|--------|-------|-----------|
| Trang chủ | `/` | SSG + ISR (1h) |
| Giới thiệu | `/gioi-thieu` | SSG |
| Khóa học | `/khoa-hoc`, `/khoa-hoc/[slug]` | SSG + ISR |
| Giảng viên | `/giang-vien`, `/giang-vien/[slug]` | SSG + ISR |
| Thư viện | `/thu-vien` | SSG + ISR |
| Tin tức | `/tin-tuc` | **SSR** (filter category) |
| Bài viết | `/tin-tuc/[slug]` | SSG + ISR |
| Liên hệ | `/lien-he` | SSG |
| Admin | `/admin/*` | **SSR** (dynamic) |

## Cài đặt

### 1. Environment

Tạo file `.env` ở thư mục gốc với các biến:

- `DATABASE_URL` — connection string từ [Neon](https://neon.tech)
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- `JWT_SECRET` — chuỗi bí mật cho session admin
- `NEXT_PUBLIC_SITE_URL` — URL production (vd: `https://melodymusic.vn`)

### 2. Database

```bash
pnpm db:push      # Tạo tables trên Neon
pnpm db:seed      # Seed dữ liệu mẫu + admin account
```

### 3. Chạy dev

```bash
pnpm dev
```

- Website: http://localhost:3000
- Admin: http://localhost:3000/admin/login
- Default admin: `admin@musik.vn` / `admin123`

## Admin CMS

| Trang | Chức năng |
|-------|-----------|
| `/admin` | Dashboard thống kê |
| `/admin/posts` | CRUD bài viết + SEO fields |
| `/admin/courses` | CRUD khóa học |
| `/admin/teachers` | CRUD giảng viên |
| `/admin/gallery` | Upload ảnh Cloudinary |
| `/admin/contacts` | Xem form liên hệ |

## Cloudinary

Ảnh upload qua `/api/admin/upload` → lưu folder `melody-music-center/`.
Next.js Image tự optimize qua `res.cloudinary.com`.

## SEO

- `sitemap.xml` — tự động từ DB
- `robots.txt` — allow public, block `/admin/`
- JSON-LD: MusicSchool, Article, Course
- Metadata per-page qua `generateMetadata()`
- Plan triển khai bài viết: [`docs/SEO-CONTENT-PLAN.md`](docs/SEO-CONTENT-PLAN.md)

## Scripts

```bash
pnpm dev          # Development
pnpm build        # Production build
pnpm start        # Production server
pnpm db:generate  # Generate Prisma client
pnpm db:push      # Push schema to Neon
pnpm db:seed      # Seed data
pnpm db:studio    # Prisma Studio GUI
```

## Deploy (Vercel)

1. Import repo, set root directory = `web`
2. Add environment variables
3. Deploy — Vercel tự chạy `prisma generate` + `next build`
4. Chạy `pnpm db:push && pnpm db:seed` một lần sau deploy
