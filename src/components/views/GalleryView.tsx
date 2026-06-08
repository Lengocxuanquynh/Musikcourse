'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import type { GalleryCategory } from '@prisma/client';

export type GalleryGroup = {
  category: GalleryCategory;
  label: string;
  images: { id: string; url: string; caption: string }[];
};

type Props = {
  galleries: GalleryGroup[];
};

type SelectedImage = {
  url: string;
  caption: string;
};

export default function GalleryView({ galleries }: Props) {
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);

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
            <h1 className="text-5xl mb-6">Thư viện ảnh</h1>
            <p className="text-xl text-white/90">
              Những khoảnh khắc đáng nhớ tại Melody Music Center
            </p>
          </motion.div>
        </div>
      </section>

      {galleries.map((gallery, galleryIndex) => (
        <section
          key={gallery.category}
          className={`py-20 ${galleryIndex % 2 === 0 ? 'bg-white' : 'bg-muted'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl text-primary mb-4">{gallery.label}</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.images.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer"
                  onClick={() => setSelectedImage({ url: image.url, caption: image.caption })}
                >
                  <ImageWithFallback
                    src={image.url}
                    alt={image.caption}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sm">{image.caption}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Đóng"
          >
            <X className="w-6 h-6" />
          </button>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-5xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[70vh]">
              <ImageWithFallback
                src={selectedImage.url}
                alt={selectedImage.caption}
                fill
                sizes="90vw"
                className="object-contain rounded-lg"
              />
            </div>
            {selectedImage.caption && (
              <p className="text-white text-center mt-4">{selectedImage.caption}</p>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
