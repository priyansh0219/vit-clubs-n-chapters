import React, { useState, useMemo } from "react";
import { ClubData, FilterState } from "@/types/club";
import { Header } from "./header";
import { BasicFilters } from "./basic-filters";
import { AdvancedFilters } from "./advanced-filters";
import { ClubCard } from "./club-card";
import { ClubPagination } from "./club-pagination";
import { EmptyState } from "./empty-state";

const ITEMS_PER_PAGE = 12;

interface ClubsContainerProps {
  clubData: ClubData[];
}

export const ClubsContainer: React.FC<ClubsContainerProps> = ({ clubData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: "",
    filterType: "ALL",
    filterClubType: "ALL",
    selectedClubTypes: [],
    selectedChapterTypes: [],
    hasSocials: null,
    selectedSocialPlatforms: [],
    showAdvancedFilters: false,
  });

  // Get unique club types for filter
  const clubTypes = useMemo(() => {
    const types = new Set<string>();
    clubData.forEach((item) => {
      if (item.asc_type === "CLUB" && item.club_type) {
        item.club_type.forEach((type) => types.add(type));
      }
    });
    return Array.from(types).sort();
  }, [clubData]);

  // Get unique chapter types for filter
  const chapterTypes = useMemo(() => {
    const types = new Set<string>();
    clubData.forEach((item) => {
      if (item.asc_type === "CHAPTER" && item.chapter_type) {
        types.add(item.chapter_type);
      }
    });
    return Array.from(types).sort();
  }, [clubData]);

  // Filter and search data
  const filteredData = useMemo(() => {
    const filtered = clubData.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase());

      const matchesType =
        filters.filterType === "ALL" || item.asc_type === filters.filterType;

      const matchesClubType =
        filters.filterClubType === "ALL" ||
        (item.asc_type === "CLUB" &&
          item.club_type?.includes(filters.filterClubType));

      // Advanced club type filter (multi-select)
      const matchesSelectedClubTypes =
        filters.selectedClubTypes.length === 0 ||
        (item.asc_type === "CLUB" &&
          item.club_type?.some((type) =>
            filters.selectedClubTypes.includes(type)
          ));

      // Advanced chapter type filter (multi-select)
      const matchesSelectedChapterTypes =
        filters.selectedChapterTypes.length === 0 ||
        (item.asc_type === "CHAPTER" &&
          item.chapter_type &&
          filters.selectedChapterTypes.includes(item.chapter_type));

      // Social media filter
      const matchesSocials =
        filters.hasSocials === null ||
        (filters.hasSocials
          ? item.socials && Object.keys(item.socials).length > 0
          : !item.socials || Object.keys(item.socials).length === 0);

      // Social platform filter
      const matchesSocialPlatforms =
        filters.selectedSocialPlatforms.length === 0 ||
        (item.socials &&
          filters.selectedSocialPlatforms.some(
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
  }, [clubData, filters]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Reset to first page when filters change
  const onFiltersChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      searchTerm: "",
      filterType: "ALL",
      filterClubType: "ALL",
      selectedClubTypes: [],
      selectedChapterTypes: [],
      hasSocials: null,
      selectedSocialPlatforms: [],
      showAdvancedFilters: false,
    });
    setCurrentPage(1);
  };

  const handleStartExploring = () => {
    const filtersElement = document.querySelector(".bg-white\\/60");
    if (filtersElement) {
      filtersElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Header */}
      <Header
        clubData={clubData}
        clubTypes={clubTypes}
        onStartExploring={handleStartExploring}
      />

      {/* Search and Filters */}
      <div className='bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-white/20 dark:border-slate-700/20'>
        <BasicFilters
          filters={filters}
          onFiltersChange={onFiltersChange}
          totalResults={filteredData.length}
          currentPage={currentPage}
          totalPages={totalPages}
        />

        <AdvancedFilters
          filters={filters}
          onFiltersChange={onFiltersChange}
          clubTypes={clubTypes}
          chapterTypes={chapterTypes}
          onClearFilters={handleClearFilters}
        />
      </div>

      {/* Results Grid */}
      {currentData.length > 0 ? (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
            {currentData.map((club) => (
              <ClubCard key={club.serial} club={club} />
            ))}
          </div>

          {/* Pagination */}
          <ClubPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <EmptyState onClearFilters={handleClearFilters} />
      )}
    </>
  );
};
