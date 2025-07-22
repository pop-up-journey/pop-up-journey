'use client';

import { Image } from '@heroui/image';
import NextImage, { StaticImageData } from 'next/image';

interface PopupPosterProps {
  src: string | StaticImageData | null;
  alt: string;
  width?: number;
  height?: number;
}

export default function PopupPoster({ src, alt, width = 400, height = 500 }: PopupPosterProps) {
  if (!src) return null;
  const imageSrc = typeof src === 'string' ? src : src.src;

  return (
    <figure className="mb-6 flex justify-center">
      <Image isBlurred as={NextImage} src={imageSrc} alt={alt} width={width} height={height} />
    </figure>
  );
}
