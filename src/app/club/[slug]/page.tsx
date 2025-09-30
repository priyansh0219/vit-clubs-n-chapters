import { generateAllSlugs, findClubBySlug } from "@/lib/slug-utils";
import { ClubData } from "@/types/club";
import data from "@/../data/data.json";
import { notFound } from "next/navigation";
import { ClubDetailPage } from "@/components/club-detail";

// Generate static params for all clubs at build time
export async function generateStaticParams() {
  const typedData = data as ClubData[];
  return generateAllSlugs(typedData);
}

interface ClubPageProps {
  params: {
    slug: string;
  };
}

export default function ClubPage({ params }: ClubPageProps) {
  const typedData = data as ClubData[];
  const club = findClubBySlug(typedData, params.slug);

  if (!club) {
    notFound();
  }

  return (
    <>
      {/* You can add metadata here if needed */}
      <ClubDetailPage club={club} />
    </>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ClubPageProps) {
  const typedData = data as ClubData[];
  const club = findClubBySlug(typedData, params.slug);

  if (!club) {
    return {
      title: "Club Not Found | VIT Clubs & Chapters",
      description: "The requested club or chapter could not be found.",
    };
  }

  return {
    title: `${club.name} | VIT Clubs & Chapters`,
    description: club.description || `Learn more about ${club.name} at VIT`,
    openGraph: {
      title: club.name,
      description: club.description || `Learn more about ${club.name} at VIT`,
      images: club.img_path ? [`/images/${club.img_path}`] : [],
    },
  };
}
