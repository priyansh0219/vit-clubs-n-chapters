import React from "react";
import { Button } from "@/components/ui/button";
import {
  Users,
  Building2,
  Palette,
  Globe,
  ExternalLink,
  Trophy,
  Sparkles,
} from "lucide-react";
import { getTotalEventsCount, getClubsWithEvents } from "@/lib/events-utils";
import { ClubData } from "@/types/club";

interface HeaderProps {
  clubData: ClubData[];
  clubTypes: string[];
  onStartExploring: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  clubData,
  clubTypes,
  onStartExploring,
}) => {
  return (
    <div className='text-center mb-16'>
      {/* Welcome Badge */}
      <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200 dark:border-blue-700 mb-6 shadow-sm'>
        <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
        <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
          Explore {clubData.length}+ Active Communities
        </span>
      </div>

      {/* Main Title with Animation */}
      <div className='relative'>
        <h1 className='text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight'>
          VIT Clubs & Chapters
        </h1>
        {/* Decorative Elements */}
        <div className='absolute -top-4 -left-4 w-8 h-8 bg-blue-400 rounded-full opacity-20 animate-bounce'></div>
        <div
          className='absolute -top-2 -right-6 w-6 h-6 bg-purple-400 rounded-full opacity-30 animate-bounce'
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className='absolute -bottom-2 left-1/4 w-4 h-4 bg-indigo-400 rounded-full opacity-25 animate-bounce'
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Enhanced Description */}
      <div className='max-w-4xl mx-auto mb-8'>
        <p className='text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4 font-light leading-relaxed'>
          Discover and join the vibrant community of clubs and chapters at
          <span className='font-semibold text-blue-600 dark:text-blue-400'>
            {" "}
            Vellore Institute of Technology
          </span>
        </p>
        <p className='text-lg text-gray-500 dark:text-gray-400 mb-6 max-w-3xl mx-auto'>
          From technical innovation to cultural expression, from academic
          excellence to social impact - find your passion and connect with
          like-minded peers in our diverse ecosystem of student organizations.
        </p>
      </div>

      {/* Gravitas 2025 Highlight */}
      <div className='mb-8 max-w-4xl mx-auto'>
        <div className='bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-2xl p-6 text-white text-center shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]'>
          <div className='flex items-center justify-center gap-3 mb-3'>
            <Sparkles className='w-8 h-8 animate-pulse' />
            <h3 className='text-2xl font-bold'>Gravitas 2025 Events</h3>
            <Trophy className='w-8 h-8 animate-pulse' />
          </div>
          <p className='text-lg mb-4 text-white/90'>
            Discover which clubs organized amazing events during VIT&apos;s
            premier fest!
          </p>
          <div className='grid grid-cols-2 gap-6 max-w-md mx-auto'>
            <div>
              <div className='text-3xl font-bold'>{getTotalEventsCount()}</div>
              <div className='text-white/80'>Total Events</div>
            </div>
            <div>
              <div className='text-3xl font-bold'>
                {getClubsWithEvents().length}
              </div>
              <div className='text-white/80'>Participating Clubs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8'>
        <div className='bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/40 dark:border-slate-700/40 hover:shadow-xl transition-all duration-300 hover:scale-105'>
          <div className='flex items-center justify-center mb-2'>
            <Users className='w-8 h-8 text-blue-600 dark:text-blue-400' />
          </div>
          <div className='text-2xl font-bold text-gray-900 dark:text-white'>
            {clubData.filter((item) => item.asc_type === "CLUB").length}
          </div>
          <div className='text-sm text-gray-600 dark:text-gray-300'>
            Active Clubs
          </div>
        </div>

        <div className='bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/40 dark:border-slate-700/40 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer'>
          <div className='flex items-center justify-center mb-2'>
            <Building2 className='w-8 h-8 text-purple-600 dark:text-purple-400' />
          </div>
          <div className='text-2xl font-bold text-gray-900 dark:text-white'>
            {clubData.filter((item) => item.asc_type === "CHAPTER").length}
          </div>
          <div className='text-sm text-gray-600 dark:text-gray-300'>
            Chapters
          </div>
        </div>

        <div className='bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/40 dark:border-slate-700/40 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer'>
          <div className='flex items-center justify-center mb-2'>
            <Palette className='w-8 h-8 text-green-600 dark:text-green-400' />
          </div>
          <div className='text-2xl font-bold text-gray-900 dark:text-white'>
            {clubTypes.length}
          </div>
          <div className='text-sm text-gray-600 dark:text-gray-300'>
            Categories
          </div>
        </div>

        <div className='bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/40 dark:border-slate-700/40 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer'>
          <div className='flex items-center justify-center mb-2'>
            <Globe className='w-8 h-8 text-orange-600 dark:text-orange-400' />
          </div>
          <div className='text-2xl font-bold text-gray-900 dark:text-white'>
            {
              clubData.filter(
                (item) => item.socials && Object.keys(item.socials).length > 0
              ).length
            }
          </div>
          <div className='text-sm text-gray-600 dark:text-gray-300'>
            Connected
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className='flex justify-center items-center'>
        <Button
          className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer'
          onClick={onStartExploring}
        >
          Browse All Clubs
          <ExternalLink className='ml-2 w-5 h-5' />
        </Button>
      </div>
    </div>
  );
};
