import React from "react";
import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, ChevronsUpDown } from "lucide-react";
import { FilterState } from "@/types/club";
import {
  formatClubType,
  formatChapterType,
  socialPlatforms,
} from "@/lib/club-utils";
import { getCategoryIcon, getSocialIcon } from "./club-icons";

interface AdvancedFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: Partial<FilterState>) => void;
  clubTypes: string[];
  chapterTypes: string[];
  onClearFilters: () => void;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  filters,
  onFiltersChange,
  clubTypes,
  chapterTypes,
  onClearFilters,
}) => {
  if (!filters.showAdvancedFilters) {
    // Legacy Club Type Filter (for backward compatibility)
    if (filters.filterType === "CLUB") {
      return (
        <div className='mt-4'>
          <Select
            value={filters.filterClubType}
            onValueChange={(value) =>
              onFiltersChange({ filterClubType: value })
            }
          >
            <SelectTrigger className='md:w-56 bg-white/70 dark:bg-slate-700/70'>
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
      );
    }
    return null;
  }

  return (
    <div className='border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {/* Multi-select Club Types */}
        {(filters.filterType === "ALL" || filters.filterType === "CLUB") && (
          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-700 dark:text-gray-300'>
              Club Categories
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  role='combobox'
                  className='w-full justify-between bg-white/70'
                >
                  {filters.selectedClubTypes.length > 0
                    ? `${filters.selectedClubTypes.length} selected`
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
                            const newSelectedTypes =
                              filters.selectedClubTypes.includes(type)
                                ? filters.selectedClubTypes.filter(
                                    (t) => t !== type
                                  )
                                : [...filters.selectedClubTypes, type];
                            onFiltersChange({
                              selectedClubTypes: newSelectedTypes,
                            });
                          }}
                          className='flex items-center gap-2'
                        >
                          <Check
                            className={`h-4 w-4 ${
                              filters.selectedClubTypes.includes(type)
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
        {(filters.filterType === "ALL" || filters.filterType === "CHAPTER") && (
          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-700 dark:text-gray-300'>
              Chapter Types
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  role='combobox'
                  className='w-full justify-between bg-white/70 dark:bg-slate-700/70'
                >
                  {filters.selectedChapterTypes.length > 0
                    ? `${filters.selectedChapterTypes.length} selected`
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
                            const newSelectedTypes =
                              filters.selectedChapterTypes.includes(type)
                                ? filters.selectedChapterTypes.filter(
                                    (t) => t !== type
                                  )
                                : [...filters.selectedChapterTypes, type];
                            onFiltersChange({
                              selectedChapterTypes: newSelectedTypes,
                            });
                          }}
                          className='flex items-center gap-2'
                        >
                          <Check
                            className={`h-4 w-4 ${
                              filters.selectedChapterTypes.includes(type)
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
          <label className='text-sm font-medium text-gray-700 dark:text-gray-300'>
            Social Media
          </label>
          <div className='space-y-2'>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='has-socials'
                checked={filters.hasSocials === true}
                onCheckedChange={(checked) =>
                  onFiltersChange({
                    hasSocials: checked
                      ? true
                      : filters.hasSocials === true
                      ? null
                      : false,
                  })
                }
              />
              <label
                htmlFor='has-socials'
                className='text-sm text-gray-700 dark:text-gray-300'
              >
                Has social media
              </label>
            </div>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='no-socials'
                checked={filters.hasSocials === false}
                onCheckedChange={(checked) =>
                  onFiltersChange({
                    hasSocials: checked
                      ? false
                      : filters.hasSocials === false
                      ? null
                      : true,
                  })
                }
              />
              <label
                htmlFor='no-socials'
                className='text-sm text-gray-700 dark:text-gray-300'
              >
                No social media
              </label>
            </div>
          </div>
        </div>

        {/* Social Platform Filter */}
        <div className='space-y-2'>
          <label className='text-sm font-medium text-gray-700 dark:text-gray-300'>
            Social Platforms
          </label>
          <div className='space-y-2'>
            {socialPlatforms.map((platform) => (
              <div key={platform} className='flex items-center space-x-2'>
                <Checkbox
                  id={platform}
                  checked={filters.selectedSocialPlatforms.includes(platform)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onFiltersChange({
                        selectedSocialPlatforms: [
                          ...filters.selectedSocialPlatforms,
                          platform,
                        ],
                      });
                    } else {
                      onFiltersChange({
                        selectedSocialPlatforms:
                          filters.selectedSocialPlatforms.filter(
                            (p) => p !== platform
                          ),
                      });
                    }
                  }}
                />
                <label
                  htmlFor={platform}
                  className='text-sm capitalize flex items-center gap-1 text-gray-700 dark:text-gray-300'
                >
                  {getSocialIcon(platform)}
                  {platform}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Gravitas 2025 Participant Filter */}
        <div className='space-y-2'>
          <label className='text-sm font-medium text-gray-700 dark:text-gray-300'>
            🎉 Gravitas 2025
          </label>
          <div className='space-y-2'>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='gravitas-participant'
                checked={filters.gravitasParticipant === true}
                onCheckedChange={(checked) =>
                  onFiltersChange({
                    gravitasParticipant: checked
                      ? true
                      : filters.gravitasParticipant === true
                      ? null
                      : false,
                  })
                }
              />
              <label
                htmlFor='gravitas-participant'
                className='text-sm text-purple-700 dark:text-purple-300 font-medium'
              >
                ✨ Participated in Gravitas 2025
              </label>
            </div>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='no-gravitas'
                checked={filters.gravitasParticipant === false}
                onCheckedChange={(checked) =>
                  onFiltersChange({
                    gravitasParticipant: checked
                      ? false
                      : filters.gravitasParticipant === false
                      ? null
                      : true,
                  })
                }
              />
              <label
                htmlFor='no-gravitas'
                className='text-sm text-gray-700 dark:text-gray-300'
              >
                Did not participate
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Clear Filters Button */}
      <div className='flex justify-end pt-2'>
        <Button variant='outline' onClick={onClearFilters} className='text-sm'>
          Clear All Filters
        </Button>
      </div>
    </div>
  );
};
