import Image from "next/image";
import { cn } from "@/lib/cn";

export function Media({
  src,
  alt,
  className,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      unoptimized
      className={cn("object-cover", className)}
      sizes="100vw"
    />
  );
}

