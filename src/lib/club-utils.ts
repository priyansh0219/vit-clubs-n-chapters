export const formatClubType = (type: string) => {
  return type
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase());
};

export const formatChapterType = (type: string) => {
  return type.replace(/_/g, " ").toUpperCase();
};

export const socialPlatforms = [
  "website",
  "instagram",
  "facebook",
  "twitter",
  "linkedin",
  "youtube",
  "github",
  "medium",
  "telegram",
  "discord",
];

export const getBadgeColors = (type: string) => {
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
        hover: "hover:from-orange-200 hover:via-amber-100 hover:to-yellow-200",
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
