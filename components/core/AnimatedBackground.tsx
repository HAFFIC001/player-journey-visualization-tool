"use client";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  ReactNode,
  useState,
} from "react";

type Props = {
  children: ReactNode;
};

export default function AnimatedBackground({
  children,
}: Props) {
  const items = Array.isArray(children)
    ? children
    : [children];

  const [hovered, setHovered] =
    useState<number | null>(null);

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((child, index) => (
        <div
          key={index}
          className="relative"
          onMouseEnter={() =>
            setHovered(index)
          }
          onMouseLeave={() =>
            setHovered(null)
          }
        >
          <AnimatePresence>
            {hovered === index && (
              <motion.div
                layoutId="card-hover"
                className="absolute inset-0 rounded-2xl bg-zinc-800"
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 28,
                }}
              />
            )}
          </AnimatePresence>

          <div className="relative z-10">
            {child}
          </div>
        </div>
      ))}
    </div>
  );
}