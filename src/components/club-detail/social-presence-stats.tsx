"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ClubData } from "@/types/club";
import {
  calculateSocialPresence,
  getSocialPresenceColors,
} from "@/lib/social-utils";
import { Users, TrendingUp, Award, Hash } from "lucide-react";

interface SocialPresenceStatsProps {
  club: ClubData;
}

export const SocialPresenceStats: React.FC<SocialPresenceStatsProps> = ({
  club,
}) => {
  const socialStats = calculateSocialPresence(club);
  const colors = getSocialPresenceColors(socialStats.level);

  return (
    <Card className='bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/40 dark:border-slate-700/40 shadow-xl'>
      <CardHeader>
        <CardTitle className='text-xl font-bold flex items-center gap-2'>
          <TrendingUp className='w-5 h-5' />
          Social Presence Score
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Main Score Display */}
        <div className='text-center space-y-4'>
          <div className='flex items-center justify-center gap-4'>
            <div className='text-4xl font-bold text-gray-900 dark:text-white'>
              {socialStats.score}
            </div>
            <div className='text-2xl text-gray-500 dark:text-gray-400'>
              / {socialStats.totalPlatforms}
            </div>
          </div>

          <Badge
            variant='outline'
            className={`text-sm ${colors.bg} ${colors.text} ${colors.border} px-4 py-2 font-semibold border-2`}
          >
            <Award className='w-4 h-4 mr-2' />
            {socialStats.level} Presence
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className='space-y-2'>
          <div className='flex justify-between text-sm'>
            <span className='text-gray-600 dark:text-gray-400'>Progress</span>
            <span className='font-semibold'>{socialStats.percentage}%</span>
          </div>
          <Progress value={socialStats.percentage} className='h-3' />
        </div>

        {/* Active Platforms Count */}
        <div className='grid grid-cols-2 gap-4'>
          <div className='text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20'>
            <div className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
              {socialStats.activePlatforms.length}
            </div>
            <div className='text-sm text-blue-600 dark:text-blue-400 font-medium'>
              Active Platforms
            </div>
          </div>

          <div className='text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20'>
            <div className='text-2xl font-bold text-purple-600 dark:text-purple-400'>
              {socialStats.totalPlatforms - socialStats.activePlatforms.length}
            </div>
            <div className='text-sm text-purple-600 dark:text-purple-400 font-medium'>
              Potential Growth
            </div>
          </div>
        </div>

        {/* Active Platforms List */}
        {socialStats.activePlatforms.length > 0 && (
          <div className='space-y-2'>
            <div className='flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300'>
              <Users className='w-4 h-4' />
              Active on:
            </div>
            <div className='flex flex-wrap gap-2'>
              {socialStats.activePlatforms.map((platform) => (
                <Badge
                  key={platform}
                  variant='secondary'
                  className='bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 dark:from-blue-900/30 dark:to-purple-900/30 dark:text-blue-300 capitalize'
                >
                  <Hash className='w-3 h-3 mr-1' />
                  {platform}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Engagement Message */}
        <div className='p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-600 border border-blue-200 dark:border-slate-600'>
          <p className='text-sm text-gray-700 dark:text-gray-300'>
            {socialStats.score === 0 &&
              "This club is just getting started with their digital presence. Stay tuned for updates!"}
            {socialStats.score >= 1 &&
              socialStats.score <= 2 &&
              "Great start! This club is building their online community across multiple platforms."}
            {socialStats.score >= 3 &&
              socialStats.score <= 5 &&
              "Excellent social presence! This club is very active across various social media platforms."}
            {socialStats.score > 5 &&
              "Outstanding digital engagement! This club has a comprehensive social media strategy."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
