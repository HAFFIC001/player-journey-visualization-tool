"use client";

import Image from "next/image";

type Props = {
  image: string;
  children: React.ReactNode;
};

export default function MapViewport({
  image,
  children,
}: Props) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="
          relative
          aspect-square
          h-full
          max-h-full
        "
      >
        <Image
          src={image}
          alt="Minimap"
          fill
          priority
          className="object-contain select-none"
        />

        {children}
      </div>
    </div>
  );
}