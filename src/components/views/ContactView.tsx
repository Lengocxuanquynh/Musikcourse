'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Facebook,
  Youtube,
  Instagram,
} from 'lucide-react';

export default function ContactView() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          phone: formData.get('phone'),
          email: formData.get('email'),
          course: formData.get('course') || undefined,
          ageGroup: formData.get('ageGroup') || undefined,
          message: formData.get('message') || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Gửi tin nhắn thất bại. Vui lòng thử lại.');
      }

      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Đã xảy ra lỗi. Vui lòng thử lại.');
    }
  }

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
            <h1 className="text-5xl mb-6">Liên hệ với chúng tôi</h1>
            <p className="text-xl text-white/90">
              Hãy để lại thông tin, chúng tôi sẽ liên hệ tư vấn và hỗ trợ bạn ngay
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl text-primary mb-6">Gửi tin nhắn cho chúng tôi</h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm text-foreground mb-2">
                      Họ và tên *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-secondary transition-shadow"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm text-foreground mb-2">
                      Số điện thoại *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="0123 456 789"
                      className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-secondary transition-shadow"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm text-foreground mb-2">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-secondary transition-shadow"
                  />
                </div>

                <div>
                  <label htmlFor="course" className="block text-sm text-foreground mb-2">
                    Khóa học quan tâm
                  </label>
                  <select
                    id="course"
                    name="course"
                    className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-secondary transition-shadow"
                  >
                    <option value="">Chọn khóa học</option>
                    <option value="piano">Piano</option>
                    <option value="guitar">Guitar</option>
                    <option value="violin">Violin</option>
                    <option value="vocal">Thanh nhạc</option>
                    <option value="organ">Organ</option>
                    <option value="ukulele">Ukulele</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="ageGroup" className="block text-sm text-foreground mb-2">
                    Độ tuổi
                  </label>
                  <select
                    id="ageGroup"
                    name="ageGroup"
                    className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-secondary transition-shadow"
                  >
                    <option value="">Chọn độ tuổi</option>
                    <option value="under-6">Dưới 6 tuổi</option>
                    <option value="6-12">6 - 12 tuổi</option>
                    <option value="13-18">13 - 18 tuổi</option>
                    <option value="over-18">Trên 18 tuổi</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm text-foreground mb-2">
                    Tin nhắn
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Chia sẻ với chúng tôi về mong muốn và mục tiêu học tập của bạn..."
                    className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-secondary resize-none transition-shadow"
                  />
                </div>

                {status === 'success' && (
                  <p className="text-green-600 text-sm">
                    Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm nhất có thể.
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-red-600 text-sm">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full px-6 py-4 bg-secondary text-primary rounded-lg hover:bg-secondary/90 transition-colors duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <Send className="w-5 h-5" />
                  {status === 'loading' ? 'Đang gửi...' : 'Gửi tin nhắn'}
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl text-primary mb-6">Thông tin liên hệ</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-lg text-primary mb-1">Địa chỉ</h3>
                      <p className="text-muted-foreground">
                        123 Đường Âm Nhạc, Phường 10, Quận 1
                        <br />
                        TP. Hồ Chí Minh, Việt Nam
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-lg text-primary mb-1">Điện thoại</h3>
                      <p className="text-muted-foreground">Hotline: 0123 456 789</p>
                      <p className="text-muted-foreground">Tư vấn: 0987 654 321</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-lg text-primary mb-1">Email</h3>
                      <p className="text-muted-foreground">contact@melodymusic.vn</p>
                      <p className="text-muted-foreground">support@melodymusic.vn</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-lg text-primary mb-1">Giờ làm việc</h3>
                      <p className="text-muted-foreground">Thứ 2 - Thứ 6: 8:00 - 21:00</p>
                      <p className="text-muted-foreground">Thứ 7 - Chủ nhật: 8:00 - 18:00</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted rounded-2xl p-6">
                <h3 className="text-xl text-primary mb-4">Kết nối với chúng tôi</h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-12 h-12 bg-white hover:bg-secondary rounded-full flex items-center justify-center transition-colors group"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-6 h-6 text-primary group-hover:text-white" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-white hover:bg-secondary rounded-full flex items-center justify-center transition-colors group"
                    aria-label="Youtube"
                  >
                    <Youtube className="w-6 h-6 text-primary group-hover:text-white" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-white hover:bg-secondary rounded-full flex items-center justify-center transition-colors group"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-6 h-6 text-primary group-hover:text-white" />
                  </a>
                </div>
              </div>

              <div className="bg-gradient-to-br from-secondary/10 to-accent rounded-2xl p-6 border-2 border-secondary/20">
                <h3 className="text-xl text-primary mb-3">Đăng ký nhận thông tin</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Nhận tin tức, ưu đãi và tips học nhạc hữu ích qua email
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Email của bạn"
                    className="flex-1 px-4 py-3 rounded-lg bg-white border border-border focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <button
                    type="button"
                    className="px-6 py-3 bg-secondary text-primary rounded-lg hover:bg-secondary/90 transition-colors"
                  >
                    Đăng ký
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-0 bg-white">
        <div className="w-full h-96">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4608594181194!2d106.69530731533444!3d10.776530192320177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f38f9ed887b%3A0x14aded5703768989!2sDistrict%201%2C%20Ho%20Chi%20Minh%20City%2C%20Vietnam!5e0!3m2!1sen!2s!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Melody Music Center Location"
          />
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary to-primary/90 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl mb-4">Học thử miễn phí ngay hôm nay!</h2>
            <p className="text-xl mb-8 text-white/90">
              Đăng ký để trải nghiệm buổi học đầu tiên hoàn toàn miễn phí
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="tel:0123456789"
                className="px-8 py-4 bg-secondary text-primary rounded-lg hover:bg-secondary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Gọi ngay: 0123 456 789
              </a>
              <a
                href="mailto:contact@melodymusic.vn"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-lg hover:bg-white/20 transition-all duration-300"
              >
                Gửi email
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
