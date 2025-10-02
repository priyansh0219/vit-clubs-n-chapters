"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EventImage } from "@/components/ui/event-image";
import { CollaborationBadge } from "@/components/ui/collaboration-badge";
import {
  Calendar,
  Clock,
  Trophy,
  Gamepad2,
  Star,
  Rocket,
  Users,
  Zap,
  ChevronDown,
  ChevronUp,
  MapPin,
  Award,
} from "lucide-react";
import { GravitasEvent } from "@/types/events";
import { format, parseISO } from "date-fns";

interface ClubEventsProps {
  events: GravitasEvent[];
  clubName: string;
}

const getEventTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "competition":
      return <Trophy className='w-4 h-4' />;
    case "games":
      return <Gamepad2 className='w-4 h-4' />;
    case "entertainment":
      return <Star className='w-4 h-4' />;
    case "startup":
      return <Rocket className='w-4 h-4' />;
    case "workshop":
      return <Users className='w-4 h-4' />;
    case "technical":
      return <Zap className='w-4 h-4' />;
    default:
      return <Award className='w-4 h-4' />;
  }
};

const getEventTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case "competition":
      return "bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-yellow-300";
    case "games":
      return "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-300";
    case "entertainment":
      return "bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800 border-pink-300";
    case "startup":
      return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300";
    case "workshop":
      return "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-300";
    case "technical":
      return "bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-800 border-indigo-300";
    default:
      return "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-300";
  }
};

const formatEventDate = (startDate: string, endDate: string) => {
  try {
    const start = parseISO(startDate);
    const end = parseISO(endDate);

    const startDateStr = format(start, "MMM dd");
    const endDateStr = format(end, "MMM dd");
    const startTime = format(start, "hh:mm a");
    const endTime = format(end, "hh:mm a");

    if (startDateStr === endDateStr) {
      return {
        date: startDateStr,
        time: `${startTime} - ${endTime}`,
        isSingleDay: true,
      };
    } else {
      return {
        date: `${startDateStr} - ${endDateStr}`,
        time: `${startTime} - ${endTime}`,
        isSingleDay: false,
      };
    }
  } catch {
    return {
      date: "TBA",
      time: "TBA",
      isSingleDay: true,
    };
  }
};

export const ClubEvents: React.FC<ClubEventsProps> = ({ events, clubName }) => {
  const [expanded, setExpanded] = useState(false);
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());

  if (!events || events.length === 0) {
    return null;
  }

  const displayEvents = expanded ? events : events.slice(0, 2);

  const toggleEventExpansion = (eventName: string) => {
    const newExpanded = new Set(expandedEvents);
    if (newExpanded.has(eventName)) {
      newExpanded.delete(eventName);
    } else {
      newExpanded.add(eventName);
    }
    setExpandedEvents(newExpanded);
  };

  return (
    <Card className='bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 border-purple-200 dark:border-purple-700/50 shadow-xl hover:shadow-2xl transition-shadow duration-300'>
      <CardHeader className='pb-4'>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-2xl font-bold flex items-center gap-3 text-purple-900 dark:text-purple-100'>
            <div className='p-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg text-white animate-pulse hover:animate-none'>
              <Calendar className='w-6 h-6' />
            </div>
            <span className='bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
              Gravitas 2025 Events
            </span>
            <Badge className='bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 animate-bounce hover:animate-none'>
              {events.length} Event{events.length > 1 ? "s" : ""}
            </Badge>
          </CardTitle>
        </div>
        <p className='text-purple-700 dark:text-purple-300 mt-2'>
          🎉 This club organized amazing events during Gravitas 2025! Check out
          their incredible contributions to VIT&apos;s flagship fest.
        </p>
      </CardHeader>

      <CardContent className='space-y-4'>
        <div className='grid gap-6'>
          {displayEvents.map((event, index) => {
            const isExpanded = expandedEvents.has(event.name);
            const eventDate = formatEventDate(event.start_date, event.end_date);

            return (
              <Card
                key={index}
                className='bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/40 dark:border-slate-600/40 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group'
              >
                <div className='md:flex'>
                  {/* Event Image */}
                  <div className='md:w-1/3 relative'>
                    <div className='aspect-video md:aspect-square relative overflow-hidden'>
                      <EventImage
                        src={event.image}
                        alt={event.name}
                        fill
                        className='object-cover transition-opacity duration-300'
                        sizes='(max-width: 768px) 100vw, 33vw'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent' />

                      {/* Event Type Badge */}
                      <Badge
                        className={`absolute top-3 left-3 ${getEventTypeColor(
                          event.type
                        )} font-semibold shadow-lg`}
                      >
                        <div className='flex items-center gap-1'>
                          {getEventTypeIcon(event.type)}
                          {event.type}
                        </div>
                      </Badge>
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className='md:w-2/3 p-6'>
                    <div className='space-y-4'>
                      {/* Event Header */}
                      <div>
                        <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
                          {event.name}
                        </h3>

                        {/* Tagline - Premium styling */}
                        {event.tagline && event.tagline !== "NA" && (
                          <div className='relative mb-4 p-3 bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-indigo-900/20 rounded-lg border-l-4 border-purple-400 dark:border-purple-500'>
                            <div className='absolute top-1 left-1 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-60'></div>
                            <p className='text-base font-semibold text-purple-700 dark:text-purple-300 italic leading-relaxed pl-2'>
                              &ldquo;{event.tagline}&rdquo;
                            </p>
                            <div className='absolute bottom-1 right-1 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse opacity-40'></div>
                          </div>
                        )}

                        {/* Collaboration info - Subtle placement */}
                        <CollaborationBadge
                          eventName={event.name}
                          currentClubName={clubName}
                          className='mb-3'
                          showClubNames={true}
                        />
                      </div>

                      {/* Event Date & Time */}
                      <div className='flex flex-wrap gap-4 text-sm'>
                        <div className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
                          <Calendar className='w-4 h-4 text-purple-500' />
                          <span className='font-medium'>{eventDate.date}</span>
                        </div>
                        <div className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
                          <Clock className='w-4 h-4 text-purple-500' />
                          <span>{eventDate.time}</span>
                        </div>
                        <div className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
                          <MapPin className='w-4 h-4 text-purple-500' />
                          <span>VIT Vellore Campus</span>
                        </div>
                      </div>

                      {/* Short Description */}
                      <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                        {event.short_description}
                      </p>

                      {/* Full Description (Expandable) */}
                      {event.description &&
                        event.description !== event.short_description && (
                          <>
                            {isExpanded && (
                              <div className='p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg'>
                                <p className='text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line'>
                                  {event.description}
                                </p>
                              </div>
                            )}

                            <Button
                              variant='ghost'
                              size='sm'
                              onClick={() => toggleEventExpansion(event.name)}
                              className='text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 p-0 h-auto font-medium'
                            >
                              {isExpanded ? (
                                <>
                                  Show Less{" "}
                                  <ChevronUp className='w-4 h-4 ml-1' />
                                </>
                              ) : (
                                <>
                                  Read More{" "}
                                  <ChevronDown className='w-4 h-4 ml-1' />
                                </>
                              )}
                            </Button>
                          </>
                        )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Show More/Less Button */}
        {events.length > 2 && (
          <div className='text-center pt-4'>
            <Button
              onClick={() => setExpanded(!expanded)}
              variant='outline'
              className='bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-purple-50 dark:hover:bg-purple-900/30 border-purple-300 dark:border-purple-600 text-purple-700 dark:text-purple-300'
            >
              {expanded ? (
                <>
                  Show Less <ChevronUp className='w-4 h-4 ml-2' />
                </>
              ) : (
                <>
                  Show All {events.length} Events{" "}
                  <ChevronDown className='w-4 h-4 ml-2' />
                </>
              )}
            </Button>
          </div>
        )}

        {/* Achievement Footer */}
        <div className='mt-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full'>
              <Award className='w-5 h-5 text-white' />
            </div>
            <div>
              <h4 className='font-semibold text-purple-900 dark:text-purple-100'>
                Gravitas 2025 Participant
              </h4>
              <p className='text-sm text-purple-700 dark:text-purple-300'>
                Successfully organized {events.length} event
                {events.length > 1 ? "s" : ""} during VIT&apos;s premier
                technical fest
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
