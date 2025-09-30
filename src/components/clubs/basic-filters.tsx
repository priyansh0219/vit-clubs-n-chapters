import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Users, SlidersHorizontal } from "lucide-react";
import { FilterState } from "@/types/club";

interface BasicFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: Partial<FilterState>) => void;
  totalResults: number;
  currentPage: number;
  totalPages: number;
}

export const BasicFilters: React.FC<BasicFiltersProps> = ({
  filters,
  onFiltersChange,
  totalResults,
  currentPage,
  totalPages,
}) => {
  return (
    <>
      {/* Main Search and Basic Filters */}
      <div className='flex flex-col md:flex-row gap-4 mb-4'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5' />
          <Input
            placeholder='Search clubs and chapters...'
            value={filters.searchTerm}
            onChange={(e) => onFiltersChange({ searchTerm: e.target.value })}
            className='pl-10 bg-white/70 dark:bg-slate-700/70'
          />
        </div>

        <Select
          value={filters.filterType}
          onValueChange={(value: "ALL" | "CLUB" | "CHAPTER") =>
            onFiltersChange({ filterType: value })
          }
        >
          <SelectTrigger className='md:w-48 bg-white/70 dark:bg-slate-700/70'>
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
          onClick={() =>
            onFiltersChange({
              showAdvancedFilters: !filters.showAdvancedFilters,
            })
          }
          className={`md:w-48 transition-all duration-300 cursor-pointer ${
            filters.showAdvancedFilters
              ? "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50"
              : "bg-white/70 dark:bg-slate-700/70 hover:bg-white/90 dark:hover:bg-slate-600/70"
          }`}
        >
          <SlidersHorizontal
            className={`mr-2 h-4 w-4 transition-transform duration-300 ${
              filters.showAdvancedFilters ? "rotate-180" : ""
            }`}
          />
          Advanced Filters
        </Button>
      </div>

      <div className='mt-4 flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-400'>
        <span className='flex items-center gap-1'>
          <Users className='w-4 h-4' />
          {totalResults} results found
        </span>
        <span>•</span>
        <span>
          Page {currentPage} of {totalPages}
        </span>
      </div>
    </>
  );
};
