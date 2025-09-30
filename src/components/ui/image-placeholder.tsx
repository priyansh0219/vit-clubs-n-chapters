import React from "react";
import { Users, Building2, Sparkles, Star, Heart } from "lucide-react";
import { ClubData } from "@/types/club";

interface ImagePlaceholderProps {
  club: ClubData;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  club,
  className = "",
  size = "md",
}) => {
  // Generate a consistent color based on club name
  const getColorScheme = (name: string) => {
    const hash = name.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);

    const colorSchemes = [
      {
        bg: "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600",
        text: "text-white",
        accent: "text-blue-100",
      },
      {
        bg: "bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600",
        text: "text-white",
        accent: "text-purple-100",
      },
      {
        bg: "bg-gradient-to-br from-green-400 via-green-500 to-green-600",
        text: "text-white",
        accent: "text-green-100",
      },
      {
        bg: "bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600",
        text: "text-white",
        accent: "text-orange-100",
      },
      {
        bg: "bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600",
        text: "text-white",
        accent: "text-pink-100",
      },
      {
        bg: "bg-gradient-to-br from-indigo-400 via-indigo-500 to-indigo-600",
        text: "text-white",
        accent: "text-indigo-100",
      },
      {
        bg: "bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600",
        text: "text-white",
        accent: "text-teal-100",
      },
      {
        bg: "bg-gradient-to-br from-red-400 via-red-500 to-red-600",
        text: "text-white",
        accent: "text-red-100",
      },
    ];

    return colorSchemes[Math.abs(hash) % colorSchemes.length];
  };

  const colorScheme = getColorScheme(club.name);

  // Get initials from club name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .filter((word) => word.length > 0)
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 3);
  };

  const initials = getInitials(club.name);

  // Size configurations
  const sizeConfig = {
    sm: {
      container: "h-32",
      icon: "w-8 h-8",
      initials: "text-lg",
      decorative: "w-4 h-4",
    },
    md: {
      container: "h-56",
      icon: "w-12 h-12",
      initials: "text-2xl",
      decorative: "w-5 h-5",
    },
    lg: {
      container: "h-64 lg:h-80",
      icon: "w-16 h-16",
      initials: "text-3xl lg:text-4xl",
      decorative: "w-6 h-6",
    },
  };

  const config = sizeConfig[size];

  return (
    <div
      className={`
      ${config.container} 
      ${colorScheme.bg} 
      ${colorScheme.text}
      ${className}
      relative overflow-hidden flex items-center justify-center
      group-hover:scale-110 transition-all duration-500 ease-out
    `}
    >
      {/* Animated background pattern */}
      <div className='absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500'>
        <div className='absolute top-4 right-4 animate-float'>
          <Sparkles
            className={`${config.decorative} transform hover:rotate-12 transition-transform duration-700`}
          />
        </div>
        <div className='absolute bottom-6 left-4 animate-float-delayed'>
          <Star className={`${config.decorative} animation-delay-300`} />
        </div>
        <div className='absolute top-1/2 left-6 transform -translate-y-1/2 animate-pulse'>
          <Heart
            className={`${config.decorative} rotate-12 animation-delay-500`}
          />
        </div>
        <div className='absolute bottom-4 right-8 animate-ping'>
          <Sparkles
            className={`${config.decorative} rotate-45 animation-delay-700`}
          />
        </div>
      </div>

      {/* Main content with subtle animations */}
      <div className='relative z-10 flex flex-col items-center justify-center text-center px-4 transform group-hover:scale-105 transition-transform duration-300'>
        {/* Club type icon with hover animation */}
        <div
          className={`${colorScheme.accent} mb-2 transform group-hover:rotate-6 transition-transform duration-500`}
        >
          {club.asc_type === "CLUB" ? (
            <Users className={`${config.icon} drop-shadow-lg`} />
          ) : (
            <Building2 className={`${config.icon} drop-shadow-lg`} />
          )}
        </div>

        {/* Club initials with text shadow */}
        <div
          className={`
          ${config.initials}
          font-bold 
          tracking-wider 
          drop-shadow-xl
          ${colorScheme.text}
          transform group-hover:scale-110 transition-transform duration-300
          text-shadow-lg
        `}
        >
          {initials}
        </div>

        {/* Subtle club type label with fade in */}
        <div
          className={`
          text-xs 
          mt-1 
          uppercase 
          tracking-wide 
          font-medium
          ${colorScheme.accent}
          opacity-90 group-hover:opacity-100 transition-opacity duration-300
        `}
        >
          {club.asc_type}
        </div>
      </div>

      {/* Enhanced gradient overlays for depth */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/20' />
      <div className='absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-black/10' />

      {/* Enhanced shimmer effect */}
      <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out' />

      {/* Subtle border glow effect */}
      <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
        <div className='absolute inset-0 border-2 border-white/20 rounded-lg animate-pulse' />
      </div>
    </div>
  );
};
