"use client";

import { useState, useMemo } from "react";
import data from "@/../data/data.json";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Search,
  Users,
  Building2,
  ExternalLink,
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
  Youtube,
  Github,
  Send,
  Globe2,
  Filter,
  SlidersHorizontal,
  Check,
  ChevronsUpDown,
  Palette,
  BookOpen,
  Heart,
  Cpu,
  Globe,
  Trophy,
  Code,
  Wrench,
  Zap,
  Microscope,
  Beaker,
  Calculator,
  Music,
  Camera,
  Gamepad2,
  Stethoscope,
  Dumbbell,
  GraduationCap,
  Rocket,
  HandHeart,
  Languages,
  Lightbulb,
  Target,
  Headphones,
  Flag,
  MapPin,
  Waves,
  Network,
  Crown,
  Hexagon,
} from "lucide-react";

const ITEMS_PER_PAGE = 12;

type ClubData = {
  serial: number;
  name: string;
  description: string;
  img_path: string;
  asc_type: "CLUB" | "CHAPTER";
  club_type?: string[];
  chapter_type?: string;
  socials?: {
    website?: string;
    instagram?: string;
    twitter?: string;
    facebook?: string;
    medium?: string;
    telegram?: string;
    linkedin?: string;
    youtube?: string;
    github?: string;
  };
};

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"ALL" | "CLUB" | "CHAPTER">(
    "ALL"
  );
  const [filterClubType, setFilterClubType] = useState<string>("ALL");
  const [selectedClubTypes, setSelectedClubTypes] = useState<string[]>([]);
  const [selectedChapterTypes, setSelectedChapterTypes] = useState<string[]>(
    []
  );
  const [hasSocials, setHasSocials] = useState<boolean | null>(null);
  const [selectedSocialPlatforms, setSelectedSocialPlatforms] = useState<
    string[]
  >([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const typedData = data as ClubData[];

  // Get unique club types for filter
  const clubTypes = useMemo(() => {
    const types = new Set<string>();
    typedData.forEach((item) => {
      if (item.asc_type === "CLUB" && item.club_type) {
        item.club_type.forEach((type) => types.add(type));
      }
    });
    return Array.from(types).sort();
  }, []);

  // Get unique chapter types for filter
  const chapterTypes = useMemo(() => {
    const types = new Set<string>();
    typedData.forEach((item) => {
      if (item.asc_type === "CHAPTER" && item.chapter_type) {
        types.add(item.chapter_type);
      }
    });
    return Array.from(types).sort();
  }, []);

  // Available social platforms
  const socialPlatforms = [
    "website",
    "instagram",
    "twitter",
    "facebook",
    "medium",
    "telegram",
    "linkedin",
    "youtube",
    "github",
  ];

  // Filter and search data
  const filteredData = useMemo(() => {
    let filtered = typedData.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesType = filterType === "ALL" || item.asc_type === filterType;

      const matchesClubType =
        filterClubType === "ALL" ||
        (item.asc_type === "CLUB" && item.club_type?.includes(filterClubType));

      // Advanced club type filter (multi-select)
      const matchesSelectedClubTypes =
        selectedClubTypes.length === 0 ||
        (item.asc_type === "CLUB" &&
          item.club_type?.some((type) => selectedClubTypes.includes(type)));

      // Advanced chapter type filter (multi-select)
      const matchesSelectedChapterTypes =
        selectedChapterTypes.length === 0 ||
        (item.asc_type === "CHAPTER" &&
          item.chapter_type &&
          selectedChapterTypes.includes(item.chapter_type));

      // Social media filter
      const matchesSocials =
        hasSocials === null ||
        (hasSocials
          ? item.socials && Object.keys(item.socials).length > 0
          : !item.socials || Object.keys(item.socials).length === 0);

      // Social platform filter
      const matchesSocialPlatforms =
        selectedSocialPlatforms.length === 0 ||
        (item.socials &&
          selectedSocialPlatforms.some(
            (platform) =>
              item.socials &&
              item.socials[platform as keyof typeof item.socials]
          ));

      return (
        matchesSearch &&
        matchesType &&
        matchesClubType &&
        matchesSelectedClubTypes &&
        matchesSelectedChapterTypes &&
        matchesSocials &&
        matchesSocialPlatforms
      );
    });

    // Always sort by serial number (ascending)
    filtered.sort((a, b) => a.serial - b.serial);

    return filtered;
  }, [
    searchTerm,
    filterType,
    filterClubType,
    selectedClubTypes,
    selectedChapterTypes,
    hasSocials,
    selectedSocialPlatforms,
  ]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType, filterClubType]);

  const formatClubType = (type: string) => {
    return type
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const formatChapterType = (type: string) => {
    return type.replace(/_/g, " ").toUpperCase();
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "website":
        return <Globe2 className='w-4 h-4' />;
      case "instagram":
        return <Instagram className='w-4 h-4' />;
      case "twitter":
        return <Twitter className='w-4 h-4' />;
      case "facebook":
        return <Facebook className='w-4 h-4' />;
      case "medium":
        return <ExternalLink className='w-4 h-4' />; // Medium doesn't have a specific icon in Lucide
      case "telegram":
        return <Send className='w-4 h-4' />; // Send icon represents messaging
      case "linkedin":
        return <Linkedin className='w-4 h-4' />;
      case "youtube":
        return <Youtube className='w-4 h-4' />;
      case "github":
        return <Github className='w-4 h-4' />;
      default:
        return <ExternalLink className='w-4 h-4' />;
    }
  };

  const getCategoryIcon = (type: string) => {
    switch (type.toUpperCase()) {
      // Chapter Types
      case "INDIAN":
        return <Crown className='w-3.5 h-3.5 text-orange-600' />; // Saffron color for Indian heritage
      case "INTERNATIONAL":
        return <Globe className='w-3.5 h-3.5 text-blue-600' />; // Blue for global reach
      case "IEEE":
        return (
          <div className='relative w-3.5 h-3.5'>
            <Hexagon className='w-3.5 h-3.5 text-purple-600' />
            <Zap className='absolute inset-0.5 w-2.5 h-2.5 text-yellow-500' />
          </div>
        ); // Hexagon with lightning for IEEE's electrical engineering focus

      // Club Types
      case "ARTS_AND_CULTURE":
        return <Palette className='w-3.5 h-3.5' />;
      case "LITERATURE":
        return <BookOpen className='w-3.5 h-3.5' />;
      case "HEALTH_&_WELLNESS":
        return <Heart className='w-3.5 h-3.5' />;
      case "TECHNICAL":
        return <Cpu className='w-3.5 h-3.5' />;
      case "SOCIAL_OUTREACH":
        return <HandHeart className='w-3.5 h-3.5' />;
      case "SPORTS":
        return <Trophy className='w-3.5 h-3.5' />;
      case "PROGRAMMING":
      case "CODING":
        return <Code className='w-3.5 h-3.5' />;
      case "ENGINEERING":
        return <Wrench className='w-3.5 h-3.5' />;
      case "ELECTRONICS":
        return <Zap className='w-3.5 h-3.5' />;
      case "SCIENCE":
        return <Microscope className='w-3.5 h-3.5' />;
      case "CHEMISTRY":
        return <Beaker className='w-3.5 h-3.5' />;
      case "MATHEMATICS":
        return <Calculator className='w-3.5 h-3.5' />;
      case "MUSIC":
        return <Music className='w-3.5 h-3.5' />;
      case "PHOTOGRAPHY":
        return <Camera className='w-3.5 h-3.5' />;
      case "GAMING":
        return <Gamepad2 className='w-3.5 h-3.5' />;
      case "MEDICAL":
        return <Stethoscope className='w-3.5 h-3.5' />;
      case "FITNESS":
        return <Dumbbell className='w-3.5 h-3.5' />;
      case "EDUCATION":
        return <GraduationCap className='w-3.5 h-3.5' />;
      case "SPACE":
      case "AEROSPACE":
        return <Rocket className='w-3.5 h-3.5' />;
      case "LANGUAGES":
      case "LANGUAGE":
        return <Languages className='w-3.5 h-3.5' />;
      case "INNOVATION":
      case "RESEARCH":
        return <Lightbulb className='w-3.5 h-3.5' />;
      case "ENTREPRENEURSHIP":
      case "BUSINESS":
        return <Target className='w-3.5 h-3.5' />;
      case "MEDIA":
      case "RADIO":
        return <Headphones className='w-3.5 h-3.5' />;
      default:
        return <Network className='w-3.5 h-3.5' />;
    }
  };

  const getBadgeColors = (type: string) => {
    switch (type.toUpperCase()) {
      case "ARTS_AND_CULTURE":
        return {
          bg: "bg-gradient-to-r from-pink-100 via-purple-50 to-indigo-100",
          text: "text-purple-800",
          border: "border-purple-300",
          hover: "hover:from-pink-200 hover:via-purple-100 hover:to-indigo-200",
          shadow: "shadow-purple-200/50",
        };
      case "LITERATURE":
        return {
          bg: "bg-gradient-to-r from-emerald-100 via-teal-50 to-cyan-100",
          text: "text-teal-800",
          border: "border-teal-300",
          hover: "hover:from-emerald-200 hover:via-teal-100 hover:to-cyan-200",
          shadow: "shadow-teal-200/50",
        };
      case "HEALTH_&_WELLNESS":
        return {
          bg: "bg-gradient-to-r from-red-100 via-rose-50 to-pink-100",
          text: "text-rose-800",
          border: "border-rose-300",
          hover: "hover:from-red-200 hover:via-rose-100 hover:to-pink-200",
          shadow: "shadow-rose-200/50",
        };
      case "TECHNICAL":
        return {
          bg: "bg-gradient-to-r from-slate-100 via-gray-50 to-zinc-100",
          text: "text-slate-800",
          border: "border-slate-300",
          hover: "hover:from-slate-200 hover:via-gray-100 hover:to-zinc-200",
          shadow: "shadow-slate-200/50",
        };
      case "SOCIAL_OUTREACH":
        return {
          bg: "bg-gradient-to-r from-orange-100 via-amber-50 to-yellow-100",
          text: "text-orange-800",
          border: "border-orange-300",
          hover:
            "hover:from-orange-200 hover:via-amber-100 hover:to-yellow-200",
          shadow: "shadow-orange-200/50",
        };
      case "SPORTS":
        return {
          bg: "bg-gradient-to-r from-green-100 via-lime-50 to-emerald-100",
          text: "text-green-800",
          border: "border-green-300",
          hover: "hover:from-green-200 hover:via-lime-100 hover:to-emerald-200",
          shadow: "shadow-green-200/50",
        };
      default:
        return {
          bg: "bg-gradient-to-r from-blue-100 via-indigo-50 to-purple-100",
          text: "text-blue-800",
          border: "border-blue-300",
          hover: "hover:from-blue-200 hover:via-indigo-100 hover:to-purple-200",
          shadow: "shadow-blue-200/50",
        };
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-4'>
            VIT Clubs & Chapters
          </h1>
          <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
            Discover and explore the vibrant community of clubs and chapters at
            VIT
          </p>
        </div>

        {/* Search and Filters */}
        <div className='bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-white/20'>
          {/* Main Search and Basic Filters */}
          <div className='flex flex-col md:flex-row gap-4 mb-4'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
              <Input
                placeholder='Search clubs and chapters by name...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10 bg-white/70'
              />
            </div>

            <Select
              value={filterType}
              onValueChange={(value: "ALL" | "CLUB" | "CHAPTER") =>
                setFilterType(value)
              }
            >
              <SelectTrigger className='md:w-48 bg-white/70'>
                <SelectValue placeholder='Filter by Type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='ALL'>All Types</SelectItem>
                <SelectItem value='CLUB'>Clubs Only</SelectItem>
                <SelectItem value='CHAPTER'>Chapters Only</SelectItem>
              </SelectContent>
            </Select>

            {/* Advanced Filters Toggle */}
            <Button
              variant='outline'
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className='md:w-48 bg-white/70'
            >
              <SlidersHorizontal className='mr-2 h-4 w-4' />
              Advanced Filters
            </Button>
          </div>

          {/* Advanced Filters Section */}
          {showAdvancedFilters && (
            <div className='border-t border-gray-200 pt-4 space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {/* Multi-select Club Types */}
                {(filterType === "ALL" || filterType === "CLUB") && (
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-gray-700'>
                      Club Categories
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant='outline'
                          role='combobox'
                          className='w-full justify-between bg-white/70'
                        >
                          {selectedClubTypes.length > 0
                            ? `${selectedClubTypes.length} selected`
                            : "Select categories..."}
                          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-full p-0'>
                        <Command>
                          <CommandInput placeholder='Search categories...' />
                          <CommandEmpty>No categories found.</CommandEmpty>
                          <CommandGroup>
                            <CommandList>
                              {clubTypes.map((type) => (
                                <CommandItem
                                  key={type}
                                  onSelect={() => {
                                    setSelectedClubTypes(
                                      selectedClubTypes.includes(type)
                                        ? selectedClubTypes.filter(
                                            (t) => t !== type
                                          )
                                        : [...selectedClubTypes, type]
                                    );
                                  }}
                                  className='flex items-center gap-2'
                                >
                                  <Check
                                    className={`h-4 w-4 ${
                                      selectedClubTypes.includes(type)
                                        ? "opacity-100"
                                        : "opacity-0"
                                    }`}
                                  />
                                  {getCategoryIcon(type)}
                                  <span>{formatClubType(type)}</span>
                                </CommandItem>
                              ))}
                            </CommandList>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                )}

                {/* Multi-select Chapter Types */}
                {(filterType === "ALL" || filterType === "CHAPTER") && (
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-gray-700'>
                      Chapter Types
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant='outline'
                          role='combobox'
                          className='w-full justify-between bg-white/70'
                        >
                          {selectedChapterTypes.length > 0
                            ? `${selectedChapterTypes.length} selected`
                            : "Select chapter types..."}
                          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-full p-0'>
                        <Command>
                          <CommandInput placeholder='Search chapter types...' />
                          <CommandEmpty>No chapter types found.</CommandEmpty>
                          <CommandGroup>
                            <CommandList>
                              {chapterTypes.map((type) => (
                                <CommandItem
                                  key={type}
                                  onSelect={() => {
                                    setSelectedChapterTypes(
                                      selectedChapterTypes.includes(type)
                                        ? selectedChapterTypes.filter(
                                            (t) => t !== type
                                          )
                                        : [...selectedChapterTypes, type]
                                    );
                                  }}
                                  className='flex items-center gap-2'
                                >
                                  <Check
                                    className={`h-4 w-4 ${
                                      selectedChapterTypes.includes(type)
                                        ? "opacity-100"
                                        : "opacity-0"
                                    }`}
                                  />
                                  {getCategoryIcon(type)}
                                  <span>{formatChapterType(type)}</span>
                                </CommandItem>
                              ))}
                            </CommandList>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                )}

                {/* Social Media Filters */}
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-700'>
                    Social Media
                  </label>
                  <div className='space-y-2'>
                    <div className='flex items-center space-x-2'>
                      <Checkbox
                        id='has-socials'
                        checked={hasSocials === true}
                        onCheckedChange={(checked) =>
                          setHasSocials(
                            checked ? true : hasSocials === true ? null : false
                          )
                        }
                      />
                      <label htmlFor='has-socials' className='text-sm'>
                        Has social media
                      </label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Checkbox
                        id='no-socials'
                        checked={hasSocials === false}
                        onCheckedChange={(checked) =>
                          setHasSocials(
                            checked ? false : hasSocials === false ? null : true
                          )
                        }
                      />
                      <label htmlFor='no-socials' className='text-sm'>
                        No social media
                      </label>
                    </div>
                  </div>
                </div>

                {/* Social Platform Filter */}
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-700'>
                    Social Platforms
                  </label>
                  <div className='space-y-2'>
                    {socialPlatforms.map((platform) => (
                      <div
                        key={platform}
                        className='flex items-center space-x-2'
                      >
                        <Checkbox
                          id={platform}
                          checked={selectedSocialPlatforms.includes(platform)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedSocialPlatforms([
                                ...selectedSocialPlatforms,
                                platform,
                              ]);
                            } else {
                              setSelectedSocialPlatforms(
                                selectedSocialPlatforms.filter(
                                  (p) => p !== platform
                                )
                              );
                            }
                          }}
                        />
                        <label
                          htmlFor={platform}
                          className='text-sm capitalize flex items-center gap-1'
                        >
                          {getSocialIcon(platform)}
                          {platform}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Clear Filters Button */}
              <div className='flex justify-end pt-2'>
                <Button
                  variant='outline'
                  onClick={() => {
                    setSearchTerm("");
                    setFilterType("ALL");
                    setFilterClubType("ALL");
                    setSelectedClubTypes([]);
                    setSelectedChapterTypes([]);
                    setHasSocials(null);
                    setSelectedSocialPlatforms([]);
                  }}
                  className='text-sm'
                >
                  Clear All Filters
                </Button>
              </div>
            </div>
          )}

          {/* Legacy Club Type Filter (for backward compatibility) */}
          {filterType === "CLUB" && !showAdvancedFilters && (
            <div className='mt-4'>
              <Select value={filterClubType} onValueChange={setFilterClubType}>
                <SelectTrigger className='md:w-56 bg-white/70'>
                  <SelectValue placeholder='Filter by Category' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='ALL'>All Categories</SelectItem>
                  {clubTypes.map((type) => (
                    <SelectItem
                      key={type}
                      value={type}
                      className='flex items-center gap-2'
                    >
                      <div className='flex items-center gap-2'>
                        {getCategoryIcon(type)}
                        <span>{formatClubType(type)}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className='mt-4 flex flex-wrap gap-2 text-sm text-gray-600'>
            <span className='flex items-center gap-1'>
              <Users className='w-4 h-4' />
              {filteredData.length} results found
            </span>
            <span>•</span>
            <span>
              Page {currentPage} of {totalPages}
            </span>
          </div>
        </div>

        {/* Results Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
          {currentData.map((item) => (
            <Card
              key={item.serial}
              className='group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-white/40 overflow-hidden p-0'
            >
              {/* Image Section with Overlaid Badge */}
              <div className='relative w-full h-56 overflow-hidden'>
                <img
                  src={`/images/${item.img_path}`}
                  alt={item.name}
                  className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                />
                {/* Gradient overlay for better text visibility */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent' />

                {/* Badge overlaid on image */}
                <div className='absolute top-4 left-4'>
                  <Badge
                    variant={item.asc_type === "CLUB" ? "default" : "secondary"}
                    className={`text-xs font-semibold shadow-lg ${
                      item.asc_type === "CLUB"
                        ? "bg-blue-600 hover:bg-blue-700 text-white border-0"
                        : "bg-purple-600 hover:bg-purple-700 text-white border-0"
                    }`}
                  >
                    <div className='flex items-center gap-1'>
                      {item.asc_type === "CLUB" ? (
                        <Users className='w-3 h-3' />
                      ) : (
                        <Building2 className='w-3 h-3' />
                      )}
                      {item.asc_type}
                    </div>
                  </Badge>
                </div>

                {/* Serial number in top right */}
                <div className='absolute top-4 right-4'>
                  <span className='text-xs text-white/90 font-mono bg-black/30 backdrop-blur-sm px-2 py-1 rounded-md'>
                    #{item.serial}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className='p-6'>
                <CardTitle className='text-xl font-bold group-hover:text-blue-600 transition-colors line-clamp-2 mb-4 leading-tight'>
                  {item.name}
                </CardTitle>

                {/* Category Tags */}
                <div className='flex flex-wrap gap-2 mb-4'>
                  {item.asc_type === "CLUB" && item.club_type ? (
                    item.club_type.map((type, index) => {
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
                  ) : item.chapter_type ? (
                    <Badge
                      variant='outline'
                      className='text-xs bg-gradient-to-r from-violet-100 via-fuchsia-50 to-purple-100 text-violet-800 border-violet-300 hover:bg-gradient-to-r hover:from-violet-200 hover:via-fuchsia-100 hover:to-purple-200 transition-all duration-300 hover:scale-110 hover:-rotate-1 flex items-center gap-1.5 px-3 py-1.5 shadow-md shadow-violet-200/50 hover:shadow-lg font-semibold backdrop-blur-sm border-2'
                    >
                      <div className='flex items-center gap-1.5'>
                        {getCategoryIcon(item.chapter_type)}
                        <span className='font-bold text-xs tracking-wide'>
                          {formatChapterType(item.chapter_type)}
                        </span>
                      </div>
                    </Badge>
                  ) : null}
                </div>

                {/* Social Links */}
                {item.socials && Object.keys(item.socials).length > 0 && (
                  <div className='flex gap-2 pt-2 border-t border-gray-100'>
                    {Object.entries(item.socials).map(
                      ([platform, url]) =>
                        url && (
                          <Button
                            key={platform}
                            variant='outline'
                            size='sm'
                            className='p-2 h-8 w-8 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 hover:scale-110'
                            asChild
                          >
                            <a
                              href={url}
                              target='_blank'
                              rel='noopener noreferrer'
                              title={`${item.name} on ${platform}`}
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
          ))}
        </div>

        {/* Empty State */}
        {currentData.length === 0 && (
          <div className='text-center py-16'>
            <div className='w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center'>
              <Search className='w-12 h-12 text-gray-400' />
            </div>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>
              No results found
            </h3>
            <p className='text-gray-600 mb-6'>
              Try adjusting your search terms or filters to find what
              you&apos;re looking for.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setFilterType("ALL");
                setFilterClubType("ALL");
              }}
              variant='outline'
            >
              Clear all filters
            </Button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className='flex justify-center'>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {/* First page */}
                {currentPage > 3 && (
                  <>
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => setCurrentPage(1)}
                        className='cursor-pointer'
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    {currentPage > 4 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                  </>
                )}

                {/* Current page and neighbors */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((page) => Math.abs(page - currentPage) <= 2)
                  .map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className='cursor-pointer'
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                {/* Last page */}
                {currentPage < totalPages - 2 && (
                  <>
                    {currentPage < totalPages - 3 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => setCurrentPage(totalPages)}
                        className='cursor-pointer'
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}
