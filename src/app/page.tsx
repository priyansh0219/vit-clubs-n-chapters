"use client";

import data from "@/../data/data.json";
import { ThemeToggle } from "@/components/theme-toggle";
import { ClubsContainer } from "@/components/clubs/clubs-container";
import { ClubData } from "@/types/club";

export default function Home() {
  const typedData = data as ClubData[];

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900'>
      <div className='container mx-auto px-4 py-8'>
        {/* Theme Toggle */}
        <div className='flex justify-end mb-4'>
          <ThemeToggle />
        </div>

        {/* Clubs Container with all the logic */}
        <ClubsContainer clubData={typedData} />
      </div>
    </div>
  );
}
