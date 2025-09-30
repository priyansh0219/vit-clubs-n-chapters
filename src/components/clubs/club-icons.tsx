import React from "react";
import {
  Globe2,
  Instagram,
  Twitter,
  Facebook,
  ExternalLink,
  Send,
  Linkedin,
  Youtube,
  Github,
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
  Network,
  Crown,
  Hexagon,
} from "lucide-react";

interface IconProps {
  className?: string;
}

export const getSocialIcon = (platform: string) => {
  const iconProps: IconProps = { className: "w-4 h-4" };

  switch (platform) {
    case "website":
      return <Globe2 {...iconProps} />;
    case "instagram":
      return <Instagram {...iconProps} />;
    case "twitter":
      return <Twitter {...iconProps} />;
    case "facebook":
      return <Facebook {...iconProps} />;
    case "medium":
      return <ExternalLink {...iconProps} />;
    case "telegram":
      return <Send {...iconProps} />;
    case "linkedin":
      return <Linkedin {...iconProps} />;
    case "youtube":
      return <Youtube {...iconProps} />;
    case "github":
      return <Github {...iconProps} />;
    default:
      return <ExternalLink {...iconProps} />;
  }
};

export const getCategoryIcon = (type: string) => {
  const iconProps: IconProps = { className: "w-3.5 h-3.5" };

  switch (type.toUpperCase()) {
    // Chapter Types
    case "INDIAN":
      return <Crown className='w-3.5 h-3.5 text-orange-600' />;
    case "INTERNATIONAL":
      return <Globe className='w-3.5 h-3.5 text-blue-600' />;
    case "IEEE":
      return (
        <div className='relative w-3.5 h-3.5'>
          <Hexagon className='w-3.5 h-3.5 text-purple-600' />
          <Zap className='absolute inset-0.5 w-2.5 h-2.5 text-yellow-500' />
        </div>
      );

    // Club Types
    case "ARTS_AND_CULTURE":
      return <Palette {...iconProps} />;
    case "LITERATURE":
      return <BookOpen {...iconProps} />;
    case "HEALTH_&_WELLNESS":
      return <Heart {...iconProps} />;
    case "TECHNICAL":
      return <Cpu {...iconProps} />;
    case "SOCIAL_OUTREACH":
      return <HandHeart {...iconProps} />;
    case "SPORTS":
      return <Trophy {...iconProps} />;
    case "PROGRAMMING":
    case "CODING":
      return <Code {...iconProps} />;
    case "ENGINEERING":
      return <Wrench {...iconProps} />;
    case "ELECTRONICS":
      return <Zap {...iconProps} />;
    case "SCIENCE":
      return <Microscope {...iconProps} />;
    case "CHEMISTRY":
      return <Beaker {...iconProps} />;
    case "MATHEMATICS":
      return <Calculator {...iconProps} />;
    case "MUSIC":
      return <Music {...iconProps} />;
    case "PHOTOGRAPHY":
      return <Camera {...iconProps} />;
    case "GAMING":
      return <Gamepad2 {...iconProps} />;
    case "MEDICAL":
      return <Stethoscope {...iconProps} />;
    case "FITNESS":
      return <Dumbbell {...iconProps} />;
    case "EDUCATION":
      return <GraduationCap {...iconProps} />;
    case "SPACE":
    case "AEROSPACE":
      return <Rocket {...iconProps} />;
    case "LANGUAGES":
    case "LANGUAGE":
      return <Languages {...iconProps} />;
    case "INNOVATION":
    case "RESEARCH":
      return <Lightbulb {...iconProps} />;
    case "ENTREPRENEURSHIP":
    case "BUSINESS":
      return <Target {...iconProps} />;
    case "MEDIA":
    case "RADIO":
      return <Headphones {...iconProps} />;
    default:
      return <Network {...iconProps} />;
  }
};
