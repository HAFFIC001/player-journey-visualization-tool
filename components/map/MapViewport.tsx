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
    <div className="absolute inset-0">
      <div
        className="relative mx-auto h-full"
        style={{
          aspectRatio: "1 / 1",
          maxWidth: "100%",
        }}
      >
        <img
          src={image}
          alt="Minimap"
          className="absolute inset-0 h-full w-full object-fill select-none"
          draggable={false}
        />

        {children}
      </div>
    </div>
  );
}
