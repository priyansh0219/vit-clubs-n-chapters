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
import { Home, Search, Users, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4'>
      <div className='w-full max-w-2xl'>
        {/* Theme Toggle */}
        <div className='flex justify-end mb-8'>
          <ThemeToggle />
        </div>

        {/* Main 404 Content */}
        <div className='text-center space-y-8'>
          {/* Animated 404 Number */}
          <div className='relative'>
            <div className='text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse'>
              404
            </div>
            <div className='absolute inset-0 text-8xl md:text-9xl font-bold text-blue-100 dark:text-slate-700 -z-10 transform translate-x-2 translate-y-2'>
              404
            </div>
          </div>

          {/* Error Badge */}
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 border border-red-200 dark:border-red-700 shadow-sm'>
            <AlertCircle className='w-4 h-4 text-red-600 dark:text-red-400' />
            <span className='text-sm font-medium text-red-700 dark:text-red-300'>
              Page Not Found
            </span>
          </div>

          {/* Main Message Card */}
          <Card className='border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm'>
            <CardHeader className='text-center'>
              <CardTitle className='text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100'>
                Oops! This club seems to be offline
              </CardTitle>
              <CardDescription className='text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto'>
                The page you&apos;re looking for doesn&apos;t exist in our
                directory of VIT clubs and chapters.
              </CardDescription>
            </CardHeader>

            <CardContent className='text-center space-y-6'>
              <div className='flex justify-center'>
                <div className='w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-700 shadow-lg'>
                  <Users className='w-16 h-16 text-blue-600 dark:text-blue-400' />
                </div>
              </div>

              <p className='text-gray-500 dark:text-gray-400 max-w-sm mx-auto'>
                But don&apos;t worry! There are plenty of amazing clubs and
                chapters waiting for you to discover.
              </p>
            </CardContent>

            <CardFooter className='flex flex-col sm:flex-row gap-4 justify-center pt-6'>
              <Button
                asChild
                className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'
              >
                <Link href='/' className='flex items-center gap-2'>
                  <Home className='w-4 h-4' />
                  Back to Home
                </Link>
              </Button>

              <Button
                asChild
                variant='outline'
                className='transition-all duration-300 hover:scale-105'
              >
                <Link href='/' className='flex items-center gap-2'>
                  <Search className='w-4 h-4' />
                  Explore Clubs
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Quick Stats */}
          <div className='grid grid-cols-2 md:grid-cols-3 gap-4 max-w-lg mx-auto'>
            <div className='bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 border border-white/20 dark:border-slate-700/50'>
              <div className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
                150+
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-300'>
                Active Clubs
              </div>
            </div>

            <div className='bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 border border-white/20 dark:border-slate-700/50'>
              <div className='text-2xl font-bold text-purple-600 dark:text-purple-400'>
                50+
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-300'>
                Chapters
              </div>
            </div>

            <div className='bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 border border-white/20 dark:border-slate-700/50 col-span-2 md:col-span-1'>
              <div className='text-2xl font-bold text-green-600 dark:text-green-400'>
                10+
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-300'>
                Categories
              </div>
            </div>
          </div>

          {/* Helpful Links */}
          <div className='text-center space-y-2'>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Looking for something specific?
            </p>
            <div className='flex flex-wrap justify-center gap-2'>
              <Button
                asChild
                variant='ghost'
                size='sm'
                className='text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
              >
                <Link href='/#technical'>Technical Clubs</Link>
              </Button>
              <span className='text-gray-300 dark:text-gray-600'>•</span>
              <Button
                asChild
                variant='ghost'
                size='sm'
                className='text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300'
              >
                <Link href='/#cultural'>Cultural Clubs</Link>
              </Button>
              <span className='text-gray-300 dark:text-gray-600'>•</span>
              <Button
                asChild
                variant='ghost'
                size='sm'
                className='text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300'
              >
                <Link href='/#social'>Social Impact</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className='absolute top-20 left-10 w-20 h-20 bg-blue-200/30 dark:bg-blue-800/20 rounded-full blur-xl'></div>
        <div className='absolute bottom-20 right-10 w-32 h-32 bg-purple-200/30 dark:bg-purple-800/20 rounded-full blur-xl'></div>
        <div className='absolute top-1/2 left-1/4 w-16 h-16 bg-indigo-200/30 dark:bg-indigo-800/20 rounded-full blur-xl'></div>
      </div>
    </div>
  );
}
