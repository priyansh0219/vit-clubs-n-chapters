"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { Search, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ClubNotFound() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4'>
      <div className='w-full max-w-2xl mx-auto'>
        {/* Theme Toggle */}
        <div className='flex justify-end mb-4'>
          <ThemeToggle />
        </div>

        {/* Main Content */}
        <div className='text-center space-y-8'>
          <Card className='bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/40 dark:border-slate-700/40 shadow-2xl'>
            <CardHeader className='text-center pb-2'>
              <div className='flex justify-center mb-6'>
                <div className='w-24 h-24 bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-700 shadow-lg'>
                  <AlertCircle className='w-12 h-12 text-red-600 dark:text-red-400' />
                </div>
              </div>

              <CardTitle className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
                Club Not Found
              </CardTitle>

              <CardDescription className='text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto'>
                The club or chapter you&apos;re looking for doesn&apos;t exist
                in our directory.
              </CardDescription>
            </CardHeader>

            <CardContent className='text-center space-y-6'>
              <p className='text-gray-500 dark:text-gray-400 max-w-sm mx-auto'>
                It might have been moved, renamed, or doesn&apos;t exist yet.
                But don&apos;t worry - there are plenty of amazing clubs waiting
                to be discovered!
              </p>
            </CardContent>

            <CardFooter className='flex flex-col sm:flex-row gap-4 justify-center pt-6'>
              <Button
                asChild
                className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'
              >
                <Link href='/' className='flex items-center gap-2'>
                  <ArrowLeft className='w-4 h-4' />
                  Back to All Clubs
                </Link>
              </Button>

              <Button
                asChild
                variant='outline'
                className='transition-all duration-300 hover:scale-105'
              >
                <Link href='/#search' className='flex items-center gap-2'>
                  <Search className='w-4 h-4' />
                  Search Clubs
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Quick Stats */}
          <div className='grid grid-cols-2 md:grid-cols-3 gap-4 max-w-lg mx-auto'>
            <div className='bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 border border-white/20 dark:border-slate-700/50'>
              <div className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
                100+
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-300'>
                Active Clubs
              </div>
            </div>

            <div className='bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 border border-white/20 dark:border-slate-700/50'>
              <div className='text-2xl font-bold text-purple-600 dark:text-purple-400'>
                60+
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-300'>
                Chapters
              </div>
            </div>

            <div className='bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 border border-white/20 dark:border-slate-700/50 col-span-2 md:col-span-1'>
              <div className='text-2xl font-bold text-green-600 dark:text-green-400'>
                24/7
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-300'>
                Community
              </div>
            </div>
          </div>

          {/* Popular Categories */}
          <div className='text-center'>
            <p className='text-gray-600 dark:text-gray-400 mb-4'>
              Explore popular categories:
            </p>
            <div className='flex flex-wrap justify-center gap-2 max-w-md mx-auto'>
              <Button
                asChild
                variant='ghost'
                size='sm'
                className='text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
              >
                <Link href='/'>Technical Clubs</Link>
              </Button>
              <span className='text-gray-300 dark:text-gray-600'>•</span>
              <Button
                asChild
                variant='ghost'
                size='sm'
                className='text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300'
              >
                <Link href='/'>Cultural Clubs</Link>
              </Button>
              <span className='text-gray-300 dark:text-gray-600'>•</span>
              <Button
                asChild
                variant='ghost'
                size='sm'
                className='text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300'
              >
                <Link href='/'>International Chapters</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
