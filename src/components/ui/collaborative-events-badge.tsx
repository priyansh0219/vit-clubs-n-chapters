"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Handshake } from "lucide-react";
import { getEventsForClub, isCollaborativeEvent } from "@/lib/events-utils";

interface CollaborativeEventsBadgeProps {
  clubName: string;
  size?: "sm" | "md" | "lg";
}

export const CollaborativeEventsBadge: React.FC<
  CollaborativeEventsBadgeProps
> = ({ clubName, size = "sm" }) => {
  const events = getEventsForClub(clubName);
  const collaborativeEvents = events.filter((event) =>
    isCollaborativeEvent(event.name)
  );

  if (collaborativeEvents.length === 0) {
    return null;
  }

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
        bg-gradient-to-r from-pink-400 to-purple-500 
        text-white border-0 shadow-md hover:shadow-lg
        transition-all duration-300 hover:scale-105
        ${sizeClasses[size]}
      `}
      title={`This club organized ${collaborativeEvents.length} collaborative event(s) with other clubs`}
    >
      <div className='flex items-center gap-1'>
        <Handshake className={iconSizes[size]} />
        <span className='font-medium'>+{collaborativeEvents.length}</span>
      </div>
    </Badge>
  );
};

export default CollaborativeEventsBadge;
