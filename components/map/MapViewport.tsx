"use client";

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
        <img
          src={image}
          alt="Minimap"
          className="absolute inset-0 h-full w-full object-contain select-none"
        />

        {children}
      </div>
    </div>
  );
}
