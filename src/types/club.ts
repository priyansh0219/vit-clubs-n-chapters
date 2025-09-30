export type ClubData = {
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

export type FilterState = {
  searchTerm: string;
  filterType: "ALL" | "CLUB" | "CHAPTER";
  filterClubType: string;
  selectedClubTypes: string[];
  selectedChapterTypes: string[];
  hasSocials: boolean | null;
  selectedSocialPlatforms: string[];
  showAdvancedFilters: boolean;
};
