import React from "react";
import Image from "next/image";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Building2 } from "lucide-react";
import { ClubData } from "@/types/club";
import {
  formatClubType,
  formatChapterType,
  getBadgeColors,
} from "@/lib/club-utils";
import { getCategoryIcon, getSocialIcon } from "./club-icons";

interface ClubCardProps {
  club: ClubData;
}

export const ClubCard: React.FC<ClubCardProps> = ({ club }) => {
  return (
    <Card className='group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/40 dark:border-slate-700/40 overflow-hidden p-0'>
      {/* Image Section with Overlaid Badge */}
      <div className='relative w-full h-56 overflow-hidden bg-white'>
        <Image
          src={`/images/${club.img_path}`}
          alt={club.name}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          className='object-cover transition-transform duration-500 group-hover:scale-110'
        />
        {/* Gradient overlay for better text visibility */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent' />

        {/* Badge overlaid on image */}
        <div className='absolute top-4 left-4'>
          <Badge
            variant={club.asc_type === "CLUB" ? "default" : "secondary"}
            className={`text-xs font-semibold shadow-lg ${
              club.asc_type === "CLUB"
                ? "bg-blue-600 hover:bg-blue-700 text-white border-0"
                : "bg-purple-600 hover:bg-purple-700 text-white border-0"
            }`}
          >
            <div className='flex items-center gap-1'>
              {club.asc_type === "CLUB" ? (
                <Users className='w-3 h-3' />
              ) : (
                <Building2 className='w-3 h-3' />
              )}
              {club.asc_type}
            </div>
          </Badge>
        </div>

        {/* Serial number in top right */}
        <div className='absolute top-4 right-4'>
          <span className='text-xs text-white/90 font-mono bg-black/30 backdrop-blur-sm px-2 py-1 rounded-md'>
            #{club.serial}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className='p-6'>
        <CardTitle className='text-xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-4 leading-tight dark:text-white'>
          {club.name}
        </CardTitle>

        {/* Category Tags */}
        <div className='flex flex-wrap gap-2 mb-4'>
          {club.asc_type === "CLUB" && club.club_type ? (
            club.club_type.map((type, index) => {
              const colors = getBadgeColors(type);
              return (
                <Badge
                  key={index}
                  variant='outline'
                  className={`text-xs ${colors.bg} ${colors.text} ${colors.border} hover:bg-gradient-to-r ${colors.hover} transition-all duration-300 hover:scale-110 hover:rotate-1 flex items-center gap-1.5 px-3 py-1.5 shadow-md ${colors.shadow} hover:shadow-lg font-semibold backdrop-blur-sm border-2`}
                >
                  <div className='flex items-center gap-1.5'>
                    {getCategoryIcon(type)}
                    <span className='font-bold text-xs tracking-wide'>
                      {formatClubType(type)}
                    </span>
                  </div>
                </Badge>
              );
            })
          ) : club.chapter_type ? (
            <Badge
              variant='outline'
              className='text-xs bg-gradient-to-r from-violet-100 via-fuchsia-50 to-purple-100 text-violet-800 border-violet-300 hover:bg-gradient-to-r hover:from-violet-200 hover:via-fuchsia-100 hover:to-purple-200 transition-all duration-300 hover:scale-110 hover:-rotate-1 flex items-center gap-1.5 px-3 py-1.5 shadow-md shadow-violet-200/50 hover:shadow-lg font-semibold backdrop-blur-sm border-2'
            >
              <div className='flex items-center gap-1.5'>
                {getCategoryIcon(club.chapter_type)}
                <span className='font-bold text-xs tracking-wide'>
                  {formatChapterType(club.chapter_type)}
                </span>
              </div>
            </Badge>
          ) : null}
        </div>

        {/* Social Links */}
        {club.socials && Object.keys(club.socials).length > 0 && (
          <div className='flex gap-2 pt-2 border-t border-gray-100 dark:border-gray-700'>
            {Object.entries(club.socials).map(
              ([platform, url]) =>
                url && (
                  <Button
                    key={platform}
                    variant='outline'
                    size='sm'
                    className='p-2 h-8 w-8 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200 hover:scale-110'
                    asChild
                  >
                    <a
                      href={url}
                      target='_blank'
                      rel='noopener noreferrer'
                      title={`${club.name} on ${platform}`}
                    >
                      {getSocialIcon(platform)}
                    </a>
                  </Button>
                )
            )}
          </div>
        )}
      </div>
    </Card>
  );
};
