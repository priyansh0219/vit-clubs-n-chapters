"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { ClubData } from "@/types/club";
import {
  ArrowLeft,
  ExternalLink,
  Share2,
  Calendar,
  MapPin,
  Mail,
  Globe,
} from "lucide-react";
import {
  formatClubType,
  formatChapterType,
  getBadgeColors,
} from "@/lib/club-utils";
import { getCategoryIcon, getSocialIcon } from "@/components/clubs/club-icons";
import { getSortedSocialPlatforms } from "@/lib/social-utils";
import { SafeImage } from "@/components/ui";
import { SocialPresenceStats } from "./social-presence-stats";

interface ClubDetailPageProps {
  club: ClubData;
}

export const ClubDetailPage: React.FC<ClubDetailPageProps> = ({ club }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: club.name,
          text: club.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header with Navigation and Theme Toggle */}
        <div className='flex justify-between items-center mb-8'>
          <Button
            asChild
            variant='outline'
            className='flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/30'
          >
            <Link href='/'>
              <ArrowLeft className='w-4 h-4' />
              Back to Clubs
            </Link>
          </Button>
          <ThemeToggle />
        </div>

        {/* Hero Section */}
        <div className='grid lg:grid-cols-2 gap-8 mb-12'>
          {/* Club Image */}
          <div className='relative flex justify-center w-full max-w-md mx-auto lg:mx-0'>
            <div className='relative w-full h-64 lg:h-80'>
              <SafeImage
                club={club}
                fill
                sizes='(max-width: 1024px) 100vw, 50vw'
                className='object-cover rounded-lg shadow-2xl'
                priority
                placeholderSize='lg'
                placeholderClassName='rounded-lg shadow-2xl'
              />
            </div>
          </div>

          {/* Club Info */}
          <div className='space-y-6'>
            <div>
              <h1 className='text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight'>
                {club.name}
              </h1>

              {/* Category Tags */}
              <div className='flex flex-wrap gap-3 mb-6'>
                {club.asc_type === "CLUB" && club.club_type ? (
                  club.club_type.map((type, index) => {
                    const colors = getBadgeColors(type);
                    return (
                      <Badge
                        key={index}
                        variant='outline'
                        className={`text-sm ${colors.bg} ${colors.text} ${colors.border} flex items-center gap-2 px-4 py-2 shadow-md font-semibold backdrop-blur-sm border-2`}
                      >
                        <div className='flex items-center gap-2'>
                          {getCategoryIcon(type)}
                          <span className='font-bold tracking-wide'>
                            {formatClubType(type)}
                          </span>
                        </div>
                      </Badge>
                    );
                  })
                ) : club.chapter_type ? (
                  <Badge
                    variant='outline'
                    className='text-sm bg-gradient-to-r from-violet-100 via-fuchsia-50 to-purple-100 text-violet-800 border-violet-300 flex items-center gap-2 px-4 py-2 shadow-md font-semibold backdrop-blur-sm border-2'
                  >
                    <div className='flex items-center gap-2'>
                      {getCategoryIcon(club.chapter_type)}
                      <span className='font-bold tracking-wide'>
                        {formatChapterType(club.chapter_type)}
                      </span>
                    </div>
                  </Badge>
                ) : null}
              </div>
            </div>

            {/* Quick Actions */}
            <div className='flex flex-wrap gap-4'>
              <Button
                onClick={handleShare}
                variant='outline'
                className='flex items-center gap-2'
              >
                <Share2 className='w-4 h-4' />
                Share
              </Button>

              {club.socials?.website && (
                <Button
                  asChild
                  className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                >
                  <a
                    href={club.socials.website}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-2'
                  >
                    <Globe className='w-4 h-4' />
                    Visit Website
                  </a>
                </Button>
              )}
            </div>

            {/* Social Links */}
            {club.socials && Object.keys(club.socials).length > 0 && (
              <Card className='bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/40 dark:border-slate-700/40'>
                <CardHeader>
                  <CardTitle className='text-lg font-semibold flex items-center gap-2'>
                    <ExternalLink className='w-5 h-5' />
                    Connect with Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='flex flex-wrap gap-3'>
                    {getSortedSocialPlatforms(club.socials).map(
                      ([platform, url]) => (
                        <Button
                          key={platform}
                          variant='outline'
                          size='sm'
                          className='flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200'
                          asChild
                        >
                          <a
                            href={url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='flex items-center gap-2'
                          >
                            {getSocialIcon(platform)}
                            <span className='capitalize'>{platform}</span>
                          </a>
                        </Button>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Description Section */}
        <Card className='bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/40 dark:border-slate-700/40 shadow-xl'>
          <CardHeader>
            <CardTitle className='text-2xl font-bold flex items-center gap-2'>
              About {club.asc_type === "CLUB" ? "the Club" : "the Chapter"}
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='text-lg text-gray-700 dark:text-gray-300 leading-relaxed'>
              {club.description ? (
                <div className='whitespace-pre-line'>{club.description}</div>
              ) : (
                <div className='text-gray-500 dark:text-gray-400 italic'>
                  No description available for this{" "}
                  {club.asc_type.toLowerCase()}.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Social Presence Stats */}
        <div className='mt-8'>
          <SocialPresenceStats club={club} />
        </div>

        {/* Contact Information */}
        <Card className='mt-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 border-blue-200 dark:border-slate-600'>
          <CardHeader>
            <CardTitle className='text-xl font-bold flex items-center gap-2'>
              <Mail className='w-5 h-5' />
              Get Involved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <p className='text-gray-700 dark:text-gray-300'>
                Interested in joining {club.name}? Connect with them through
                their social media channels or visit during club hours at VIT
                campus.
              </p>

              <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
                <MapPin className='w-4 h-4' />
                <span>Vellore Institute of Technology, Vellore Campus</span>
              </div>

              <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
                <Calendar className='w-4 h-4' />
                <span>
                  Contact during academic sessions for membership details
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back to Top */}
        <div className='text-center mt-12'>
          <Button
            asChild
            variant='outline'
            className='bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-blue-50 dark:hover:bg-blue-900/30'
          >
            <Link href='/'>Explore More Clubs & Chapters</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
