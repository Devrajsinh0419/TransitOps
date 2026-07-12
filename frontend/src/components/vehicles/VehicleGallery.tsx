'use client';

import React, { useState } from 'react';
import { Card } from '../cards/Card';
import { Eye, ChevronLeft, ChevronRight, X, Image as ImageIcon } from 'lucide-react';

export interface VehicleGalleryProps {
  vehicleId: string;
  images?: string[];
}

const defaultImages = [
  'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1000&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1000&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000&auto=format&fit=crop&q=80',
];

export function VehicleGallery({ vehicleId, images = defaultImages }: VehicleGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const nextImage = () => {
    setActiveIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Card className="p-5 select-none space-y-4 text-left relative">
      <div className="border-b border-border/60 pb-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-foreground">Vehicle Photos</h3>
          <p className="text-[10px] text-muted-foreground">Attached vehicle inspection pictures</p>
        </div>
        <ImageIcon className="h-4.5 w-4.5 text-primary" />
      </div>

      {/* Main image viewer */}
      <div className="relative aspect-video rounded-xl overflow-hidden border border-border group bg-muted">
        <img
          src={images[activeIdx]}
          alt="Vehicle visual"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-102"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
          <span className="text-[9px] font-bold text-white uppercase tracking-wider">
            Image {activeIdx + 1} of {images.length}
          </span>
          <button
            onClick={() => setLightboxOpen(true)}
            className="p-1.5 rounded-lg bg-black/60 border border-white/20 text-white hover:bg-black/80 transition-colors cursor-pointer"
          >
            <Eye className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Carousel controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/50 hover:bg-black/75 text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/50 hover:bg-black/75 text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`h-11 w-14 rounded-lg overflow-hidden border transition-all cursor-pointer bg-muted ${
              idx === activeIdx ? 'border-primary ring-2 ring-primary/20' : 'border-border opacity-70 hover:opacity-100'
            }`}
          >
            <img src={img} alt="thumb" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      {/* Lightbox full overlay */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4">
          <div className="flex justify-between items-center text-white">
            <span className="text-xs font-bold font-mono">LIGHTBOX VIEWER</span>
            <button
              onClick={() => setLightboxOpen(false)}
              className="p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center max-h-[85vh]">
            <img src={images[activeIdx]} alt="Full view" className="max-w-full max-h-full object-contain rounded-lg" />

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          <div className="text-center text-white/50 text-[10px] font-bold pb-2">
            Image {activeIdx + 1} of {images.length}
          </div>
        </div>
      )}
    </Card>
  );
}

export default VehicleGallery;
