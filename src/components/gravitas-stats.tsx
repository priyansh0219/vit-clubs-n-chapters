"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  Calendar,
  Sparkles,
  Users,
  Award,
  TrendingUp,
  Star,
  Gamepad2,
  GraduationCap,
  Code2,
  Lightbulb,
  Handshake,
} from "lucide-react";
import {
  getTotalEventsCount,
  getClubsWithEvents,
  getEventsByType,
  getEventsCountByType,
  getCollaborativeEventsCount,
} from "@/lib/events-utils";

interface GravitasStatsProps {
  className?: string;
}

export const GravitasStats: React.FC<GravitasStatsProps> = ({
  className = "",
}) => {
  const totalEvents = getTotalEventsCount();
  const participatingClubs = getClubsWithEvents();

  if (totalEvents === 0) {
    return null;
  }

  // First row stats
  const primaryStats = [
    {
      icon: Trophy,
      label: "Total Events",
      value: totalEvents,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      borderColor: "border-yellow-200 dark:border-yellow-700",
    },
    {
      icon: Users,
      label: "Participating Clubs",
      value: participatingClubs.length,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-700",
    },
  ];

  // Second row - Event categories
  const eventCategoryStats = [
    {
      icon: Award,
      label: "Competitions",
      value: getEventsCountByType("Competition"),
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-700",
    },
    {
      icon: Gamepad2,
      label: "Games & Fun",
      value: getEventsCountByType("Games"),
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-700",
    },
    {
      icon: GraduationCap,
      label: "Workshops",
      value:
        getEventsCountByType("Workshop") + getEventsCountByType("workshop"),
      color: "text-indigo-600",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
      borderColor: "border-indigo-200 dark:border-indigo-700",
    },
    {
      icon: Code2,
      label: "Hackathons & Ideas",
      value:
        getEventsCountByType("Hackathon") + getEventsCountByType("Ideathon"),
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      borderColor: "border-orange-200 dark:border-orange-700",
    },
    {
      icon: Handshake,
      label: "Collaborative Events",
      value: getCollaborativeEventsCount(),
      color: "text-pink-600",
      bgColor: "bg-pink-50 dark:bg-pink-900/20",
      borderColor: "border-pink-200 dark:border-pink-700",
    },
  ];

  return (
    <Card
      className={`bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-800 dark:via-indigo-900/30 dark:to-purple-900/30 border-purple-200 dark:border-purple-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 ${className}`}
    >
      <CardHeader className='text-center pb-4'>
        <div className='flex items-center justify-center gap-3 mb-3'>
          <div className='p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse'>
            <Sparkles className='w-6 h-6 text-white' />
          </div>
          <CardTitle className='text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
            Gravitas 2025 Highlights
          </CardTitle>
          <div className='p-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse'>
            <Calendar className='w-6 h-6 text-white' />
          </div>
        </div>
        <p className='text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto'>
          Discover the incredible participation of VIT clubs during our flagship
          technical fest. From competitions to cultural events, see how our
          community came together!
        </p>
      </CardHeader>

      <CardContent>
        {/* First Row - Primary Stats */}
        <div className='grid grid-cols-2 gap-4 mb-4 max-w-md mx-auto'>
          {primaryStats.map((stat, index) => (
            <div
              key={stat.label}
              className={`${stat.bgColor} ${stat.borderColor} border-2 rounded-xl p-4 text-center transition-colors duration-300 group max-w-xs`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className='flex items-center justify-center mb-3'>
                <div
                  className={`p-2 ${stat.color} bg-white dark:bg-slate-800 rounded-lg shadow-sm group-hover:shadow-md transition-shadow`}
                >
                  <stat.icon className='w-6 h-6' />
                </div>
              </div>
              <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-400 font-medium'>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Second Row - Event Categories */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6 max-w-6xl mx-auto'>
          {eventCategoryStats.map((stat, index) => (
            <div
              key={stat.label}
              className={`${stat.bgColor} ${stat.borderColor} border-2 rounded-xl p-4 text-center transition-colors duration-300 group max-w-xs`}
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              <div className='flex items-center justify-center mb-3'>
                <div
                  className={`p-2 ${stat.color} bg-white dark:bg-slate-800 rounded-lg shadow-sm group-hover:shadow-md transition-shadow`}
                >
                  <stat.icon className='w-6 h-6' />
                </div>
              </div>
              <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-400 font-medium'>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Fun Facts */}
        <div className='grid md:grid-cols-2 gap-4'>
          <div className='bg-white/60 dark:bg-slate-800/60 rounded-lg p-4 border border-white/40 dark:border-slate-600/40'>
            <div className='flex items-center gap-2 mb-2'>
              <TrendingUp className='w-5 h-5 text-green-500' />
              <span className='font-semibold text-green-700 dark:text-green-300'>
                Engagement
              </span>
            </div>
            <p className='text-sm text-gray-600 dark:text-gray-300'>
              Over{" "}
              <span className='font-bold text-purple-600'>
                {Math.round((participatingClubs.length / 161) * 100)}%
              </span>{" "}
              of VIT clubs participated in Gravitas 2025
            </p>
          </div>

          <div className='bg-white/60 dark:bg-slate-800/60 rounded-lg p-4 border border-white/40 dark:border-slate-600/40'>
            <div className='flex items-center gap-2 mb-2'>
              <Star className='w-5 h-5 text-yellow-500' />
              <span className='font-semibold text-yellow-700 dark:text-yellow-300'>
                Diversity
              </span>
            </div>
            <p className='text-sm text-gray-600 dark:text-gray-300'>
              Events spanning{" "}
              <span className='font-bold text-purple-600'>technical</span>,
              <span className='font-bold text-purple-600'> cultural</span>, and
              <span className='font-bold text-purple-600'>
                {" "}
                entertainment
              </span>{" "}
              domains
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className='text-center mt-6'>
          <Badge className='bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 animate-pulse hover:animate-none px-4 py-2'>
            Look for the ✨ Gravitas 2025 badge on club cards below!
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
