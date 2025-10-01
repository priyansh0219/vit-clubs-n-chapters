import { ClubData } from "@/types/club";

/**
 * Calculate social presence score based on number of social media platforms
 */
export function calculateSocialPresence(club: ClubData): {
  score: number;
  totalPlatforms: number;
  activePlatforms: string[];
  level: "Low" | "Medium" | "High" | "Excellent";
  percentage: number;
} {
  const allPlatforms = [
    "website",
    "instagram",
    "facebook",
    "twitter",
    "linkedin",
    "youtube",
    "github",
    "medium",
    "telegram",
  ];

  if (!club.socials) {
    return {
      score: 0,
      totalPlatforms: allPlatforms.length,
      activePlatforms: [],
      level: "Low",
      percentage: 0,
    };
  }

  const activePlatforms = Object.entries(club.socials)
    .filter(([, url]) => url && url.trim() !== "")
    .map(([platform]) => platform);

  const score = activePlatforms.length;
  const percentage = Math.round((score / allPlatforms.length) * 100);

  let level: "Low" | "Medium" | "High" | "Excellent";
  if (score === 0) {
    level = "Low";
  } else if (score <= 2) {
    level = "Medium";
  } else if (score <= 5) {
    level = "High";
  } else {
    level = "Excellent";
  }

  return {
    score,
    totalPlatforms: allPlatforms.length,
    activePlatforms,
    level,
    percentage,
  };
}

/**
 * Get color scheme for social presence level
 */
export function getSocialPresenceColors(
  level: "Low" | "Medium" | "High" | "Excellent"
) {
  switch (level) {
    case "Low":
      return {
        bg: "bg-red-100 dark:bg-red-900/20",
        text: "text-red-700 dark:text-red-400",
        border: "border-red-300 dark:border-red-700",
        progress: "bg-red-500",
      };
    case "Medium":
      return {
        bg: "bg-yellow-100 dark:bg-yellow-900/20",
        text: "text-yellow-700 dark:text-yellow-400",
        border: "border-yellow-300 dark:border-yellow-700",
        progress: "bg-yellow-500",
      };
    case "High":
      return {
        bg: "bg-blue-100 dark:bg-blue-900/20",
        text: "text-blue-700 dark:text-blue-400",
        border: "border-blue-300 dark:border-blue-700",
        progress: "bg-blue-500",
      };
    case "Excellent":
      return {
        bg: "bg-green-100 dark:bg-green-900/20",
        text: "text-green-700 dark:text-green-400",
        border: "border-green-300 dark:border-green-700",
        progress: "bg-green-500",
      };
    default:
      return {
        bg: "bg-gray-100 dark:bg-gray-900/20",
        text: "text-gray-700 dark:text-gray-400",
        border: "border-gray-300 dark:border-gray-700",
        progress: "bg-gray-500",
      };
  }
}
