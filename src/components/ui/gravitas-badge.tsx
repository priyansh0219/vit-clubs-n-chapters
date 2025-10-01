"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Trophy, Sparkles } from "lucide-react";
import { clubHasEvents, getEventsForClub } from "@/lib/events-utils";

interface GravitasBadgeProps {
  clubName: string;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
}

export const GravitasBadge: React.FC<GravitasBadgeProps> = ({
  clubName,
  size = "md",
  showCount = false,
}) => {
  if (!clubHasEvents(clubName)) {
    return null;
  }

  const events = getEventsForClub(clubName);
  const eventCount = events.length;

  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <Badge
      className={`
      bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 
      text-white border-0 shadow-lg hover:shadow-xl
      transition-all duration-300 hover:scale-105
      ${sizeClasses[size]}
      animate-pulse
    `}
    >
      <div className='flex items-center gap-1'>
        <Sparkles className={iconSizes[size]} />
        <span className='font-bold'>Gravitas 2025</span>
        {showCount && (
          <>
            <Trophy className={iconSizes[size]} />
            <span>{eventCount}</span>
          </>
        )}
      </div>
    </Badge>
  );
};
