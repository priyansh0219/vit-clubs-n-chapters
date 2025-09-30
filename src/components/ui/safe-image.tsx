import React, { useState } from "react";
import Image from "next/image";
import { ImagePlaceholder } from "./image-placeholder";
import { ClubData } from "@/types/club";

interface SafeImageProps {
  club: ClubData;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  placeholderSize?: "sm" | "md" | "lg";
  placeholderClassName?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  club,
  className = "",
  fill = false,
  sizes,
  priority = false,
  width,
  height,
  placeholderSize = "md",
  placeholderClassName = "",
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // If no image path or it's empty, show placeholder
  if (!club.img_path || club.img_path.trim() === "" || hasError) {
    return (
      <ImagePlaceholder
        club={club}
        size={placeholderSize}
        className={placeholderClassName}
      />
    );
  }

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* Show placeholder while loading */}
      {isLoading && (
        <div className='absolute inset-0'>
          <ImagePlaceholder
            club={club}
            size={placeholderSize}
            className={placeholderClassName}
          />
        </div>
      )}

      {/* Actual image */}
      <Image
        src={`/images/${club.img_path}`}
        alt={club.name}
        fill={fill}
        width={width}
        height={height}
        sizes={sizes}
        className={`${className} ${
          isLoading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
        priority={priority}
        onError={handleError}
        onLoad={handleLoad}
      />
    </>
  );
};
