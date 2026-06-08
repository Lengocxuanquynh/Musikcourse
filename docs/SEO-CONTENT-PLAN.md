# Plan SEO Triển Khai Bài Viết — Melody Music Center

> Áp dụng sau khi hoàn thành kiến trúc Next.js + Neon + Cloudinary + Admin CMS.

## 1. Mục tiêu

| Giai đoạn | Thời gian | Mục tiêu |
|-----------|-----------|----------|
| Tuần 1–2 | Index & nền tảng | 15+ URL index, rich results LocalBusiness |
| Tuần 3–4 | Long-tail local | Top 20 từ khóa "học [nhạc cụ] [quận]" |
| Tháng 2–3 | Content hub | 20+ bài viết, 500+ impressions/tháng |
| Tháng 3–6 | Authority | Top 10 từ khóa trung bình cạnh tranh |

## 2. Phân loại nội dung theo module

### 2.1 Landing pages khóa học (SSG — đã có)

Mỗi khóa học tại `/khoa-hoc/[slug]` cần bổ sung qua Admin:

- **Nội dung:** 800–1.200 từ HTML trong field `content`
- **Meta title:** `Học [Nhạc cụ] [Khu vực] | Melody Music Center` (≤ 60 ký tự)
- **Meta description:** CTA + SĐT + ưu đãi (≤ 160 ký tự)
- **Focus keyword:** 1 từ khóa chính (field `focusKeyword` trên Post, tương tự cho Course)
- **Ảnh Cloudinary:** WebP, alt text tiếng Việt có từ khóa
- **Internal links:** 2–3 link tới bài blog liên quan + `/lien-he`

### 2.2 Blog / Tin tức (SSR listing + ISR detail)

**Tần suất xuất bản:** 2–3 bài/tuần qua Admin → `/admin/posts`

**Cấu trúc mỗi bài (template SEO):**

```
1. H1 — chứa focus keyword (duy nhất 1 H1)
2. Đoạn mở đầu 100–150 từ — keyword trong 100 từ đầu
3. Mục lục (H2, H3) — 4–6 section
4. Nội dung chính 1.000–1.500 từ
5. FAQ 3–5 câu (thêm Schema FAQPage trong content HTML)
6. CTA box → /lien-he
7. Related posts — 3 bài cùng category
```

**Điền đủ trong Admin Post form:**

| Field | Quy tắc |
|-------|---------|
| `title` | H1, có keyword, hấp dẫn click |
| `slug` | Tiếng Việt không dấu, ngắn gọn |
| `excerpt` | 150–160 ký tự, tóm tắt + hook |
| `metaTitle` | Khác title 10–20%, thêm brand |
| `metaDescription` | CTA rõ ràng |
| `focusKeyword` | 1 keyword chính để theo dõi |
| `category` | KNOWLEDGE / GUIDE / NEWS / EVENT |
| `coverImage` | Upload Cloudinary, 1200×630, nén auto |
| `publishedAt` | Ngày xuất bản thực tế |
| `featured` | 1 bài featured/tuần cho trang /tin-tuc |

## 3. Lịch nội dung 4 tuần đầu

### Tuần 1 — Foundation (5 bài)

| # | Tiêu đề | Slug | Keyword | Category |
|---|---------|------|---------|----------|
| 1 | 10 Tips học Piano hiệu quả cho người mới bắt đầu | `10-tips-hoc-piano-hieu-qua` | học piano hiệu quả | KNOWLEDGE |
| 2 | Học Guitar bao lâu thì chơi được bài hát? | `hoc-guitar-bao-lau-thi-choi-duoc` | học guitar bao lâu | KNOWLEDGE |
| 3 | Chi phí học Piano tại TP.HCM 2026 | `chi-phi-hoc-piano-tphcm-2026` | học piano giá bao nhiêu | GUIDE |
| 4 | Melody khai trương cơ sở Quận 7 | `khai-truong-co-so-quan-7` | trung tâm dạy nhạc quận 7 | NEWS |
| 5 | Tại sao nên cho trẻ học nhạc từ nhỏ? | `tai-sao-cho-tre-hoc-nhac-tu-nho` | cho trẻ học nhạc | EDUCATION |

### Tuần 2 — Local SEO (4 bài)

| # | Tiêu đề | Keyword |
|---|---------|---------|
| 6 | Học Piano Quận 1 — Lộ trình từ con số 0 | học piano quận 1 |
| 7 | Top 5 trung tâm dạy Guitar uy tín TP.HCM | trung tâm dạy guitar tphcm |
| 8 | Cách chọn đàn Guitar cho người mới | chọn đàn guitar |
| 9 | Kỹ thuật hơi thở trong thanh nhạc | kỹ thuật hơi thở thanh nhạc |

### Tuần 3 — Conversion (4 bài)

| # | Tiêu đề | Keyword |
|---|---------|---------|
| 10 | Học thử Piano miễn phí — Cần chuẩn bị gì? | học thử piano miễn phí |
| 11 | Piano hay Guitar — Nên chọn gì cho trẻ 6 tuổi? | học piano hay guitar cho trẻ |
| 12 | Lộ trình học Violin 6 tháng đầu | lộ trình học violin |
| 13 | Workshop âm nhạc tháng 6 — Đăng ký ngay | workshop âm nhạc tphcm |

### Tuần 4 — Authority (4 bài)

| # | Tiêu đề | Keyword |
|---|---------|---------|
| 14 | Sai lầm thường gặp khi học Ukulele | sai lầm học ukulele |
| 15 | Học viên Melody đạt giải Guitar toàn quốc | học guitar tphcm |
| 16 | So sánh học Piano online vs offline | học piano online |
| 17 | Organ điện tử — Có khó học không? | học organ |

## 4. Quy trình xuất bản qua Admin

```
1. Research keyword (Google Suggest, Search Console)
2. Viết outline (H2/H3) trong Google Docs
3. Viết nội dung 1.000+ từ
4. Upload ảnh → Cloudinary qua /admin/posts
5. Điền SEO fields (metaTitle, metaDescription, focusKeyword)
6. Preview → Publish
7. Request indexing Search Console
8. Chia sẻ Facebook/Zalo OA
```

## 5. Internal linking matrix

| Từ bài viết | Link tới |
|-------------|----------|
| Bài về Piano | `/khoa-hoc/hoc-piano`, `/giang-vien/nguyen-minh-tuan` |
| Bài về Guitar | `/khoa-hoc/hoc-guitar`, `/lien-he` |
| Bài về trẻ em | `/khoa-hoc`, `/gioi-thieu` |
| Bài sự kiện | `/thu-vien`, `/lien-he` |
| Mọi bài | 1 CTA `/lien-he` cuối bài |

## 6. Technical SEO checklist mỗi bài

- [ ] Slug unique, không dấu
- [ ] Canonical tự động qua `generateMetadata`
- [ ] OG image từ Cloudinary (1200×630)
- [ ] Article Schema JSON-LD (tự động)
- [ ] Alt text mọi ảnh trong content
- [ ] Internal links ≥ 3
- [ ] Mobile preview OK
- [ ] PageSpeed ≥ 85

## 7. KPI theo dõi

| Metric | Công cụ | Mục tiêu tháng 1 |
|--------|---------|------------------|
| Indexed pages | Search Console | ≥ 25 |
| Impressions | Search Console | ≥ 200 |
| CTR | Search Console | ≥ 2% |
| Avg position (long-tail) | Search Console | ≤ 30 |
| Organic sessions | GA4 | ≥ 100 |
| Contact form submissions | Admin /contacts | ≥ 10 |

## 8. Content clusters (6 tháng)

```
Cluster Piano
├── /khoa-hoc/hoc-piano (pillar)
├── 10-tips-hoc-piano-hieu-qua
├── chi-phi-hoc-piano-tphcm-2026
├── hoc-piano-quan-1
└── hoc-piano-hay-guitar-cho-tre

Cluster Guitar
├── /khoa-hoc/hoc-guitar (pillar)
├── hoc-guitar-bao-lau-thi-choi-duoc
├── cach-chon-dan-guitar
└── sai-lam-hoc-ukulele

Cluster Local
├── khai-truong-co-so-quan-7
├── top-trung-tam-day-guitar-tphcm
└── workshop-am-nhac-tphcm
```

## 9. Off-page song song

- Google Business Profile: 2 post/tuần link về bài mới
- Facebook page: share mỗi bài trong 24h đầu
- Zalo OA: gửi newsletter 1 lần/tuần
- Nhờ học viên review Google (mục tiêu 20 review/tháng đầu)

## 10. Lưu ý khi dùng Cloudinary cho SEO

- Folder: `melody-music-center/posts/[slug]/`
- Đặt tên file: `[slug]-cover.webp`, `[slug]-inline-1.webp`
- Transformation: `q_auto,f_auto,w_1200` cho OG, `w_800` cho inline
- Lưu `publicId` vào `coverImageId` để quản lý/xóa qua Admin
