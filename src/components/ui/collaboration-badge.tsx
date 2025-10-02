"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Handshake, Users } from "lucide-react";
import {
  isCollaborativeEvent,
  getCollaboratingClubs,
} from "@/lib/events-utils";
import { generateSlug } from "@/lib/slug-utils";

interface CollaborationBadgeProps {
  eventName: string;
  currentClubName?: string;
  className?: string;
  showClubNames?: boolean;
}

export const CollaborationBadge: React.FC<CollaborationBadgeProps> = ({
  eventName,
  currentClubName,
  className = "",
  showClubNames = false,
}) => {
  const isCollaborative = isCollaborativeEvent(eventName);

  if (!isCollaborative) {
    return null;
  }

  const collaboratingClubs = getCollaboratingClubs(eventName);
  const otherClubs = currentClubName
    ? collaboratingClubs.filter((club) => club !== currentClubName)
    : collaboratingClubs;

  const clubCount = collaboratingClubs.length;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Badge
        variant='secondary'
        className='bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 text-pink-700 dark:text-pink-300 border-pink-300 dark:border-pink-700 flex items-center gap-1 w-fit'
      >
        <Handshake className='w-3 h-3' />
        <span className='text-xs font-medium'>
          Collaborative ({clubCount} clubs)
        </span>
      </Badge>

      {showClubNames && otherClubs.length > 0 && (
        <div className='text-xs text-gray-500 dark:text-gray-500 bg-gray-50 dark:bg-gray-800/30 rounded-md px-2 py-1.5 border border-gray-200 dark:border-gray-700'>
          <div className='flex items-start gap-1.5'>
            <Users className='w-3 h-3 mt-0.5 flex-shrink-0 text-gray-400' />
            <div className='leading-relaxed'>
              <span className='font-normal text-gray-600 dark:text-gray-400'>
                In collaboration with{" "}
              </span>
              {otherClubs.map((club, index) => (
                <React.Fragment key={club}>
                  <Link
                    href={`/club/${generateSlug(club)}`}
                    className='text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 underline decoration-1 underline-offset-2 transition-colors duration-200 font-medium'
                  >
                    {club}
                  </Link>
                  {index < otherClubs.length - 1 && (
                    <span className='text-gray-500 dark:text-gray-500'>
                      {index === otherClubs.length - 2 ? " and " : ", "}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollaborationBadge;
