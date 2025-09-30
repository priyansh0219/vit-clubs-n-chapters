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
  Filter,
  SlidersHorizontal,
  Check,
  ChevronsUpDown,
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
    instagram?: string;
    linkedin?: string;
    facebook?: string;
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
  const socialPlatforms = ["instagram", "linkedin", "facebook"];

  // Filter and search data
  const filteredData = useMemo(() => {
    let filtered = typedData.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());

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
      case "instagram":
        return <Instagram className='w-4 h-4' />;
      case "linkedin":
        return <Linkedin className='w-4 h-4' />;
      case "facebook":
        return <Facebook className='w-4 h-4' />;
      default:
        return <ExternalLink className='w-4 h-4' />;
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
                placeholder='Search clubs and chapters...'
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
                                >
                                  <Check
                                    className={`mr-2 h-4 w-4 ${
                                      selectedClubTypes.includes(type)
                                        ? "opacity-100"
                                        : "opacity-0"
                                    }`}
                                  />
                                  {formatClubType(type)}
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
                                >
                                  <Check
                                    className={`mr-2 h-4 w-4 ${
                                      selectedChapterTypes.includes(type)
                                        ? "opacity-100"
                                        : "opacity-0"
                                    }`}
                                  />
                                  {formatChapterType(type)}
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
                    <SelectItem key={type} value={type}>
                      {formatClubType(type)}
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
              className='group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-white/30'
            >
              <CardHeader className='pb-3'>
                <div className='flex items-start justify-between'>
                  <div className='flex items-center gap-2'>
                    {item.asc_type === "CLUB" ? (
                      <Users className='w-5 h-5 text-blue-600' />
                    ) : (
                      <Building2 className='w-5 h-5 text-purple-600' />
                    )}
                    <Badge
                      variant={
                        item.asc_type === "CLUB" ? "default" : "secondary"
                      }
                      className='text-xs'
                    >
                      {item.asc_type}
                    </Badge>
                  </div>
                  <span className='text-xs text-gray-500 font-mono'>
                    #{item.serial}
                  </span>
                </div>

                <CardTitle className='text-lg group-hover:text-blue-600 transition-colors line-clamp-2'>
                  {item.name}
                </CardTitle>
              </CardHeader>

              <CardContent className='pt-0'>
                <CardDescription className='text-sm text-gray-600 line-clamp-4 mb-4 leading-relaxed'>
                  {item.description}
                </CardDescription>

                {/* Tags */}
                <div className='flex flex-wrap gap-2 mb-4'>
                  {item.asc_type === "CLUB" && item.club_type ? (
                    item.club_type.map((type, index) => (
                      <Badge
                        key={index}
                        variant='outline'
                        className='text-xs bg-blue-50 text-blue-700 border-blue-200'
                      >
                        {formatClubType(type)}
                      </Badge>
                    ))
                  ) : item.chapter_type ? (
                    <Badge
                      variant='outline'
                      className='text-xs bg-purple-50 text-purple-700 border-purple-200'
                    >
                      {formatChapterType(item.chapter_type)}
                    </Badge>
                  ) : null}
                </div>

                {/* Social Links */}
                {item.socials && Object.keys(item.socials).length > 0 && (
                  <div className='flex gap-2'>
                    {Object.entries(item.socials).map(
                      ([platform, url]) =>
                        url && (
                          <Button
                            key={platform}
                            variant='outline'
                            size='sm'
                            className='p-2 h-8 w-8 hover:bg-blue-50'
                            asChild
                          >
                            <a
                              href={url}
                              target='_blank'
                              rel='noopener noreferrer'
                            >
                              {getSocialIcon(platform)}
                            </a>
                          </Button>
                        )
                    )}
                  </div>
                )}
              </CardContent>
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
