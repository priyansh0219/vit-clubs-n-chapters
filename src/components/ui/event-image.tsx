import React, { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

interface EventImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
}

export const EventImage: React.FC<EventImageProps> = ({
  src,
  alt,
  fill = false,
  className = "",
  sizes,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  if (hasError) {
    return (
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 via-indigo-50 to-blue-100 dark:from-slate-700 dark:via-slate-650 dark:to-slate-600 ${className}`}
      >
        <div className='text-center p-4'>
          <div className='relative mb-3'>
            <div className='absolute inset-0 bg-purple-200 dark:bg-purple-700 rounded-full opacity-20 animate-pulse'></div>
            <ImageIcon className='w-16 h-16 text-purple-500 dark:text-purple-400 mx-auto relative z-10' />
          </div>
          <h3 className='text-sm font-semibold text-purple-700 dark:text-purple-300 mb-1 line-clamp-2'>
            {alt}
          </h3>
          <p className='text-xs text-purple-600 dark:text-purple-400 font-medium opacity-75'>
            Gravitas 2025 Event
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div
          className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 dark:from-slate-700 dark:to-slate-600 animate-pulse`}
        >
          <div className='text-center'>
            <ImageIcon className='w-8 h-8 text-purple-400 dark:text-purple-300 mx-auto mb-1 animate-pulse' />
            <p className='text-xs text-purple-500 dark:text-purple-400 font-medium'>
              Loading...
            </p>
          </div>
        </div>
      )}
      <Image
        key={`${src}-${retryCount}`}
        src={src}
        alt={alt}
        fill={fill}
        className={className}
        sizes={sizes}
        onError={() => {
          console.warn(`Failed to load event image: ${src}`);
          if (retryCount < 2) {
            // Retry loading the image up to 2 times
            setRetryCount((prev) => prev + 1);
            setTimeout(() => {
              setIsLoading(true);
            }, 1000);
          } else {
            setHasError(true);
            setIsLoading(false);
          }
        }}
        onLoad={() => setIsLoading(false)}
      />
    </>
  );
};
