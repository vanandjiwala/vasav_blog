import * as React from "react";
import { cn } from "@/lib/utils";

interface PolaroidProps {
  src: string;
  alt: string;
  caption: string;
  rotation?: "left" | "right" | "none";
}

const rotationClasses = {
  left: "-rotate-2",
  right: "rotate-2",
  none: "rotate-0",
};

export function Polaroid({ src, alt, caption, rotation = "none" }: PolaroidProps) {
  return (
    <div
      className={cn(
        "inline-block bg-white p-4 pb-16 shadow-xl transition-transform hover:scale-105 hover:shadow-2xl",
        "break-inside-avoid mb-8",
        rotationClasses[rotation]
      )}
    >
      <div className="relative overflow-hidden bg-muted">
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-contain"
        />
      </div>
      <p className="mt-4 text-center font-[family-name:var(--font-licorice)] text-3xl text-gray-800">
        {caption}
      </p>
    </div>
  );
}
