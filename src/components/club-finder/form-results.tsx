"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Trophy,
  Sparkles,
  RefreshCw,
  X,
  ExternalLink,
  Heart,
  Star,
  Zap,
} from "lucide-react";
import { FormData } from "./form-config";
import { ClubData } from "@/types/club";
import { ClubCard } from "../clubs/club-card";

interface FormResultsProps {
  formData: FormData;
  clubData: ClubData[];
  onClose: () => void;
  onRestart: () => void;
}

interface ClubMatch {
  club: ClubData;
  score: number;
  reasons: string[];
  matchType: "perfect" | "great" | "good";
}

export const FormResults: React.FC<FormResultsProps> = ({
  formData,
  clubData,
  onClose,
  onRestart,
}) => {
  // Club matching algorithm
  const clubMatches = useMemo((): ClubMatch[] => {
    const matches: ClubMatch[] = [];

    clubData.forEach((club) => {
      let score = 0;
      const reasons: string[] = [];

      // Type matching (20 points)
      if (formData.clubType === "BOTH" || club.asc_type === formData.clubType) {
        score += 20;
        reasons.push(
          `${club.asc_type.toLowerCase()} type matches your preference`
        );
      }

      // Category matching (25 points)
      if (club.club_type && formData.categories.length > 0) {
        const categoryMatches = club.club_type.filter((type) =>
          formData.categories.some((selectedCategory) => {
            // Map our form categories to club categories
            const categoryMap: Record<string, string[]> = {
              TECHNICAL: ["TECHNICAL", "COMPUTER", "ENGINEERING", "SCIENCE"],
              ARTS_AND_CULTURE: ["ARTS_AND_CULTURE", "CULTURAL", "LITERARY"],
              ENTREPRENEURSHIP: ["ENTREPRENEURSHIP", "BUSINESS", "MANAGEMENT"],
              SOCIAL_SERVICE: ["SOCIAL_SERVICE", "NGO", "COMMUNITY"],
              SPORTS: ["SPORTS", "FITNESS", "HEALTH"],
              ACADEMIC: ["ACADEMIC", "RESEARCH", "EDUCATIONAL"],
              HOBBY: ["HOBBY", "RECREATION", "SPECIAL_INTEREST"],
            };

            const mappedCategories = categoryMap[selectedCategory] || [
              selectedCategory,
            ];
            return mappedCategories.some(
              (mapped) =>
                type.toUpperCase().includes(mapped) ||
                mapped.includes(type.toUpperCase())
            );
          })
        );

        if (categoryMatches.length > 0) {
          const categoryScore = Math.min(25, categoryMatches.length * 8);
          score += categoryScore;
          reasons.push(
            `${categoryMatches.length} category match${
              categoryMatches.length > 1 ? "es" : ""
            }`
          );
        }
      }

      // Chapter type matching for chapters
      if (
        club.asc_type === "CHAPTER" &&
        club.chapter_type &&
        formData.categories.length > 0
      ) {
        const isRelevantChapter = formData.categories.some((category) => {
          const chapterMap: Record<string, string[]> = {
            TECHNICAL: ["IEEE", "ACM", "CSI", "COMPUTER", "TECHNICAL"],
            ENTREPRENEURSHIP: ["ENTREPRENEURSHIP", "BUSINESS"],
            ACADEMIC: ["ACADEMIC", "RESEARCH", "EDUCATIONAL"],
            ARTS_AND_CULTURE: ["LITERARY", "ARTS"],
          };

          const mappedCategories = chapterMap[category] || [];
          return mappedCategories.some((mapped) =>
            club.chapter_type!.toUpperCase().includes(mapped)
          );
        });

        if (isRelevantChapter) {
          score += 20;
          reasons.push("Professional chapter matches your interests");
        }
      }

      // Social media matching (10 points)
      const hasActiveSocials =
        club.socials && Object.keys(club.socials).length > 0;
      if (formData.socialMediaActive && hasActiveSocials) {
        score += 10;
        reasons.push("Active on social media");
      } else if (!formData.socialMediaActive && !hasActiveSocials) {
        score += 5;
        reasons.push("Low social media focus");
      }

      // Leadership opportunities (15 points)
      if (
        formData.leadershipInterest === "YES_IMMEDIATE" ||
        formData.leadershipInterest === "YES_FUTURE"
      ) {
        // Assume clubs offer more leadership opportunities
        if (club.asc_type === "CLUB") {
          score += 15;
          reasons.push("Good leadership opportunities");
        } else {
          score += 10;
          reasons.push("Structured leadership roles available");
        }
      }

      // Competition interest matching (10 points)
      if (
        formData.competitionInterest === "LOVE" ||
        formData.competitionInterest === "ENJOY"
      ) {
        // Technical clubs and specific clubs likely have more competitions
        if (
          club.club_type?.some((type) =>
            ["TECHNICAL", "COMPUTER", "ENGINEERING", "ROBOTICS"].some((tech) =>
              type.toUpperCase().includes(tech)
            )
          )
        ) {
          score += 10;
          reasons.push("Competition-oriented community");
        }
      }

      // Technical interests matching (15 points)
      if (formData.techInterests.length > 0 && club.club_type) {
        const techMatches = club.club_type.filter((type) => {
          const techMap: Record<string, string[]> = {
            WEB_DEVELOPMENT: ["WEB", "DEVELOPMENT", "COMPUTER"],
            AI_ML: ["AI", "ML", "ARTIFICIAL", "MACHINE", "DATA"],
            CYBERSECURITY: ["CYBER", "SECURITY"],
            ROBOTICS: ["ROBOTICS", "AUTOMATION"],
            DATA_SCIENCE: ["DATA", "ANALYTICS", "SCIENCE"],
            BLOCKCHAIN: ["BLOCKCHAIN", "CRYPTO"],
            MOBILE_APPS: ["MOBILE", "APP", "ANDROID", "IOS"],
          };

          return formData.techInterests.some((techInterest) => {
            const mappedTechs = techMap[techInterest] || [techInterest];
            return mappedTechs.some((mapped) =>
              type.toUpperCase().includes(mapped.toUpperCase())
            );
          });
        });

        if (techMatches.length > 0) {
          score += 15;
          reasons.push("Technical focus aligns with your interests");
        }
      }

      // Bonus points for well-established clubs (5 points)
      if (hasActiveSocials && Object.keys(club.socials!).length >= 3) {
        score += 5;
        reasons.push("Well-established with strong online presence");
      }

      // Only include clubs with a reasonable score
      if (score >= 15) {
        let matchType: "perfect" | "great" | "good" = "good";
        if (score >= 70) matchType = "perfect";
        else if (score >= 50) matchType = "great";

        matches.push({ club, score, reasons, matchType });
      }
    });

    // Sort by score (highest first) and limit to top 20
    return matches.sort((a, b) => b.score - a.score).slice(0, 20);
  }, [formData, clubData]);

  const perfectMatches = clubMatches.filter((m) => m.matchType === "perfect");
  const greatMatches = clubMatches.filter((m) => m.matchType === "great");
  const goodMatches = clubMatches.filter((m) => m.matchType === "good");

  return (
    <div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center p-4'>
      <div className='w-full max-w-6xl my-8 overflow-y-auto max-h-[95vh] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-white dark:scrollbar-thumb-gray-500 dark:scrollbar-track-gray-900 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-lg'>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className='w-full'
        >
          <Card className='bg-transparent border-0 shadow-none'>
            {/* Header */}
            <CardHeader className='space-y-4 pb-4'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                  <div className='flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full'>
                    <Sparkles className='w-8 h-8 text-white' />
                  </div>
                  <div>
                    <CardTitle className='text-3xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent'>
                      Your Perfect Matches! 🎉
                    </CardTitle>
                    <CardDescription className='text-lg text-gray-600 dark:text-gray-400'>
                      Found {clubMatches.length} clubs tailored just for you
                    </CardDescription>
                  </div>
                </div>

                <div className='flex items-center gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={onRestart}
                    className='flex items-center gap-2 cursor-pointer'
                  >
                    <RefreshCw className='w-4 h-4' />
                    Try Again
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={onClose}
                    className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer'
                  >
                    <X className='w-5 h-5' />
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className='grid grid-cols-3 gap-4'>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className='text-center p-4 rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20'
                >
                  <div className='text-2xl font-bold text-yellow-600 dark:text-yellow-400'>
                    {perfectMatches.length}
                  </div>
                  <div className='text-sm text-gray-600 dark:text-gray-400'>
                    Perfect Matches
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className='text-center p-4 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20'
                >
                  <div className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
                    {greatMatches.length}
                  </div>
                  <div className='text-sm text-gray-600 dark:text-gray-400'>
                    Great Matches
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className='text-center p-4 rounded-lg bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20'
                >
                  <div className='text-2xl font-bold text-green-600 dark:text-green-400'>
                    {goodMatches.length}
                  </div>
                  <div className='text-sm text-gray-600 dark:text-gray-400'>
                    Good Matches
                  </div>
                </motion.div>
              </div>

              <Separator />

              {/* Disclaimer */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4'
              >
                <div className='flex items-start gap-3'>
                  <div className='text-blue-500 dark:text-blue-400 mt-0.5'>
                    <svg
                      className='w-5 h-5'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                  <div className='text-sm text-blue-700 dark:text-blue-300'>
                    <p className='font-medium mb-1'>Please Note:</p>
                    <p>
                      These recommendations are based on your responses and may
                      not perfectly match your interests. We encourage you to
                      explore clubs beyond these suggestions and attend their
                      events to find the best fit for your personal goals and
                      preferences.
                    </p>
                  </div>
                </div>
              </motion.div>
            </CardHeader>

            {/* Results */}
            <CardContent className='space-y-6'>
              {clubMatches.length === 0 ? (
                <div className='text-center py-12 space-y-4'>
                  <div className='text-6xl'>😅</div>
                  <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                    Hmm, no perfect matches found
                  </h3>
                  <p className='text-gray-600 dark:text-gray-400'>
                    Try adjusting your preferences or explore all clubs to find
                    something interesting!
                  </p>
                  <Button onClick={onRestart} className='mt-4 cursor-pointer'>
                    <RefreshCw className='w-4 h-4 mr-2' />
                    Update Preferences
                  </Button>
                </div>
              ) : (
                <div className='space-y-8'>
                  {/* Perfect Matches */}
                  {perfectMatches.length > 0 && (
                    <div>
                      <div className='flex items-center gap-3 mb-4'>
                        <div className='flex items-center justify-center w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full'>
                          <Trophy className='w-4 h-4 text-white' />
                        </div>
                        <h3 className='text-xl font-bold text-gray-900 dark:text-white'>
                          Perfect Matches
                        </h3>
                        <Badge className='bg-gradient-to-r from-yellow-400 to-orange-500 text-white'>
                          {perfectMatches.length}
                        </Badge>
                      </div>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {perfectMatches.map((match, index) => (
                          <motion.div
                            key={match.club.serial}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className='relative'
                          >
                            <div className='absolute -top-2 -right-2 z-10'>
                              <Badge className='bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs'>
                                {match.score}% Match
                              </Badge>
                            </div>
                            <ClubCard club={match.club} />
                            <div className='mt-2 space-y-1'>
                              {match.reasons.slice(0, 2).map((reason, idx) => (
                                <div
                                  key={idx}
                                  className='text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1'
                                >
                                  <Zap className='w-3 h-3 text-yellow-500' />
                                  {reason}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Great Matches */}
                  {greatMatches.length > 0 && (
                    <div>
                      <div className='flex items-center gap-3 mb-4'>
                        <div className='flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full'>
                          <Star className='w-4 h-4 text-white' />
                        </div>
                        <h3 className='text-xl font-bold text-gray-900 dark:text-white'>
                          Great Matches
                        </h3>
                        <Badge className='bg-gradient-to-r from-blue-500 to-purple-600 text-white'>
                          {greatMatches.length}
                        </Badge>
                      </div>
                      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {greatMatches.map((match, index) => (
                          <motion.div
                            key={match.club.serial}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className='relative'
                          >
                            <div className='absolute -top-2 -right-2 z-10'>
                              <Badge className='bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs'>
                                {match.score}% Match
                              </Badge>
                            </div>
                            <ClubCard club={match.club} />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Good Matches */}
                  {goodMatches.length > 0 && (
                    <div>
                      <div className='flex items-center gap-3 mb-4'>
                        <div className='flex items-center justify-center w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full'>
                          <Heart className='w-4 h-4 text-white' />
                        </div>
                        <h3 className='text-xl font-bold text-gray-900 dark:text-white'>
                          Good Matches
                        </h3>
                        <Badge className='bg-gradient-to-r from-green-400 to-blue-500 text-white'>
                          {goodMatches.length}
                        </Badge>
                      </div>
                      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {goodMatches.map((match, index) => (
                          <motion.div
                            key={match.club.serial}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.03 }}
                            className='relative'
                          >
                            <div className='absolute -top-2 -right-2 z-10'>
                              <Badge className='bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs'>
                                {match.score}%
                              </Badge>
                            </div>
                            <ClubCard club={match.club} />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>

            {/* Footer */}
            <div className='p-6 pt-4 bg-gray-50/50 dark:bg-gray-800/50 border-t'>
              <div className='flex items-center justify-between'>
                <div className='text-sm text-gray-600 dark:text-gray-400'>
                  💡 These recommendations are based on your preferences.
                  Explore more to find hidden gems!
                </div>
                <div className='flex items-center gap-2'>
                  <Button
                    variant='outline'
                    onClick={onRestart}
                    className='flex items-center gap-2 cursor-pointer'
                  >
                    <RefreshCw className='w-4 h-4' />
                    Try Different Answers
                  </Button>
                  <Button
                    onClick={onClose}
                    className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white cursor-pointer'
                  >
                    Explore All Clubs
                    <ExternalLink className='w-4 h-4 ml-2' />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
