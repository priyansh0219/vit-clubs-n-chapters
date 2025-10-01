// Form question types and interfaces
export interface FormData {
  // Personal Info
  branch: string;
  year: string;

  // Club Preferences
  clubType: "CLUB" | "CHAPTER" | "BOTH";
  categories: string[];

  // Interests & Goals
  primaryGoal: string;
  timeCommitment: string;
  skillLevel: string;

  // Personality & Style
  workingStyle: string;
  eventPreference: string;
  leadershipInterest: string;

  // Technical Preferences (for tech clubs)
  techInterests: string[];

  // Social & Networking
  networkingImportance: string;
  socialMediaActive: boolean;

  // Commitment Level
  competitionInterest: string;
  learningStyle: string;
}

export interface Question {
  id: keyof FormData;
  title: string;
  description?: string;
  type: "radio" | "checkbox" | "select" | "slider" | "switch";
  options?: { value: string; label: string; description?: string }[];
  required: boolean;
  conditional?: {
    dependsOn: keyof FormData;
    showWhen: string | string[];
  };
}

// VIT branches
export const VIT_BRANCHES = [
  { value: "CSE", label: "Computer Science & Engineering" },
  { value: "ECE", label: "Electronics & Communication Engineering" },
  { value: "EEE", label: "Electrical & Electronics Engineering" },
  { value: "MECH", label: "Mechanical Engineering" },
  { value: "CIVIL", label: "Civil Engineering" },
  { value: "CHEM", label: "Chemical Engineering" },
  { value: "BIOTECH", label: "Biotechnology" },
  { value: "IT", label: "Information Technology" },
  { value: "AIML", label: "AI & Machine Learning" },
  { value: "DS", label: "Data Science" },
  { value: "CYBER", label: "Cyber Security" },
  { value: "BIOENG", label: "Bioengineering" },
  { value: "FASHION", label: "Fashion Technology" },
  { value: "AUTOMOTIVE", label: "Automotive Engineering" },
  { value: "OTHER", label: "Other" },
];

// Academic years
export const ACADEMIC_YEARS = [
  { value: "FIRST", label: "1st Year - Just Started!" },
  { value: "SECOND", label: "2nd Year - Getting the Hang of It" },
  { value: "THIRD", label: "3rd Year - In the Zone" },
  { value: "FOURTH", label: "4th Year - Almost There!" },
  { value: "POSTGRAD", label: "Postgraduate Student" },
];

// Club categories based on the data
export const CLUB_CATEGORIES = [
  {
    value: "TECHNICAL",
    label: "Technical & Engineering",
    description: "Programming, robotics, engineering societies",
  },
  {
    value: "ARTS_AND_CULTURE",
    label: "Arts & Culture",
    description: "Photography, music, dance, literature",
  },
  {
    value: "ENTREPRENEURSHIP",
    label: "Entrepreneurship & Business",
    description: "Business development, startups, finance",
  },
  {
    value: "SOCIAL_SERVICE",
    label: "Social Service & NGO",
    description: "Community service, social impact",
  },
  {
    value: "SPORTS",
    label: "Sports & Fitness",
    description: "Athletics, health, outdoor activities",
  },
  {
    value: "ACADEMIC",
    label: "Academic & Research",
    description: "Subject-specific learning, research",
  },
  {
    value: "HOBBY",
    label: "Hobbies & Special Interests",
    description: "Gaming, collections, niche interests",
  },
];

// Form questions configuration
export const FORM_QUESTIONS: Question[] = [
  // Personal Information
  {
    id: "branch",
    title: "🎓 What's your academic branch?",
    description:
      "This helps us recommend clubs aligned with your field of study",
    type: "select",
    options: VIT_BRANCHES,
    required: true,
  },
  {
    id: "year",
    title: "📚 Which year are you in?",
    description:
      "Different years have different opportunities and time commitments",
    type: "radio",
    options: ACADEMIC_YEARS,
    required: true,
  },

  // Club Type Preference
  {
    id: "clubType",
    title: "🏛️ What type of organization interests you?",
    description:
      "Clubs are student-run, while chapters are professional society affiliates",
    type: "radio",
    options: [
      {
        value: "CLUB",
        label: "Student Clubs",
        description: "Student-run organizations with flexible activities",
      },
      {
        value: "CHAPTER",
        label: "Professional Chapters",
        description: "Professional society branches with formal structure",
      },
      {
        value: "BOTH",
        label: "Open to Both",
        description: "I'm interested in exploring all options",
      },
    ],
    required: true,
  },

  // Categories Interest
  {
    id: "categories",
    title: "🎯 Which areas spark your interest?",
    description:
      "Select all that apply - we'll find clubs matching your passions",
    type: "checkbox",
    options: CLUB_CATEGORIES,
    required: true,
  },

  // Primary Goal
  {
    id: "primaryGoal",
    title: "🚀 What's your main goal in joining a club?",
    description: "This helps us understand what you're looking to achieve",
    type: "radio",
    options: [
      {
        value: "SKILL_DEVELOPMENT",
        label: "Skill Development",
        description: "Learn new technical or soft skills",
      },
      {
        value: "NETWORKING",
        label: "Networking & Connections",
        description: "Meet like-minded people and build relationships",
      },
      {
        value: "LEADERSHIP",
        label: "Leadership Experience",
        description: "Take on responsibilities and lead projects",
      },
      {
        value: "PORTFOLIO",
        label: "Portfolio Building",
        description: "Add impressive projects and experiences",
      },
      {
        value: "FUN",
        label: "Fun & Recreation",
        description: "Enjoy hobbies and have a good time",
      },
      {
        value: "CAREER",
        label: "Career Advancement",
        description: "Gain industry exposure and job opportunities",
      },
    ],
    required: true,
  },

  // Time Commitment
  {
    id: "timeCommitment",
    title: "⏰ How much time can you dedicate weekly?",
    description: "Be realistic about your availability for best matches",
    type: "radio",
    options: [
      {
        value: "MINIMAL",
        label: "1-3 hours",
        description: "Light involvement, flexible schedule",
      },
      {
        value: "MODERATE",
        label: "4-7 hours",
        description: "Regular participation, some projects",
      },
      {
        value: "SIGNIFICANT",
        label: "8-12 hours",
        description: "Active member, multiple commitments",
      },
      {
        value: "INTENSIVE",
        label: "12+ hours",
        description: "Core team member, major responsibilities",
      },
    ],
    required: true,
  },

  // Skill Level
  {
    id: "skillLevel",
    title: "📈 How would you describe your current skill level?",
    description: "In areas related to your interests",
    type: "radio",
    options: [
      {
        value: "BEGINNER",
        label: "Beginner",
        description: "Just starting out, eager to learn",
      },
      {
        value: "INTERMEDIATE",
        label: "Intermediate",
        description: "Have some experience, want to improve",
      },
      {
        value: "ADVANCED",
        label: "Advanced",
        description: "Experienced, can mentor others",
      },
      {
        value: "EXPERT",
        label: "Expert",
        description: "High proficiency, can lead technical projects",
      },
    ],
    required: true,
  },

  // Working Style
  {
    id: "workingStyle",
    title: "👥 What's your preferred working style?",
    description:
      "This helps match you with clubs that fit your collaboration preferences",
    type: "radio",
    options: [
      {
        value: "SOLO",
        label: "Individual Work",
        description: "Prefer working independently on projects",
      },
      {
        value: "SMALL_TEAM",
        label: "Small Teams",
        description: "Like close-knit collaboration (2-5 people)",
      },
      {
        value: "LARGE_TEAM",
        label: "Large Teams",
        description: "Thrive in bigger group dynamics",
      },
      {
        value: "FLEXIBLE",
        label: "Flexible",
        description: "Adapt to different team sizes and situations",
      },
    ],
    required: true,
  },

  // Event Preference
  {
    id: "eventPreference",
    title: "🎉 What type of events excite you most?",
    description: "Different clubs organize different types of activities",
    type: "radio",
    options: [
      {
        value: "WORKSHOPS",
        label: "Workshops & Learning Sessions",
        description: "Skill-building and educational content",
      },
      {
        value: "COMPETITIONS",
        label: "Competitions & Contests",
        description: "Hackathons, contests, challenges",
      },
      {
        value: "SOCIAL",
        label: "Social & Cultural Events",
        description: "Parties, cultural programs, meetups",
      },
      {
        value: "CONFERENCES",
        label: "Conferences & Seminars",
        description: "Professional talks and industry events",
      },
      {
        value: "PROJECTS",
        label: "Project Showcases",
        description: "Exhibitions and project demonstrations",
      },
      {
        value: "MIXED",
        label: "Mix of Everything",
        description: "Variety keeps things interesting",
      },
    ],
    required: true,
  },

  // Leadership Interest
  {
    id: "leadershipInterest",
    title: "👑 Are you interested in leadership roles?",
    description: "Some clubs offer more leadership opportunities than others",
    type: "radio",
    options: [
      {
        value: "YES_IMMEDIATE",
        label: "Yes, as soon as possible",
        description: "Ready to take charge now",
      },
      {
        value: "YES_FUTURE",
        label: "Yes, but in the future",
        description: "Want to learn first, then lead",
      },
      {
        value: "MAYBE",
        label: "Maybe, depends on the opportunity",
        description: "Open to the right situation",
      },
      {
        value: "NO",
        label: "No, prefer to contribute differently",
        description: "Happy being an active member",
      },
    ],
    required: true,
  },

  // Technical Interests (conditional)
  {
    id: "techInterests",
    title: "💻 Which technical areas interest you?",
    description: "Select all that apply",
    type: "checkbox",
    options: [
      { value: "WEB_DEVELOPMENT", label: "Web Development" },
      { value: "MOBILE_APPS", label: "Mobile App Development" },
      { value: "AI_ML", label: "Artificial Intelligence & Machine Learning" },
      { value: "CYBERSECURITY", label: "Cybersecurity" },
      { value: "DATA_SCIENCE", label: "Data Science & Analytics" },
      { value: "ROBOTICS", label: "Robotics & Automation" },
      { value: "BLOCKCHAIN", label: "Blockchain & Cryptocurrency" },
      { value: "GAME_DEV", label: "Game Development" },
      { value: "IOT", label: "Internet of Things (IoT)" },
      { value: "CLOUD", label: "Cloud Computing" },
      { value: "DEVOPS", label: "DevOps & Infrastructure" },
      { value: "OPEN_SOURCE", label: "Open Source Contribution" },
    ],
    required: false,
    conditional: {
      dependsOn: "categories",
      showWhen: "TECHNICAL",
    },
  },

  // Networking Importance
  {
    id: "networkingImportance",
    title: "🤝 How important is networking to you?",
    description: "Some clubs focus more on professional networking than others",
    type: "radio",
    options: [
      {
        value: "VERY_HIGH",
        label: "Very Important",
        description: "Primary reason for joining",
      },
      {
        value: "HIGH",
        label: "Important",
        description: "Significant factor in my decision",
      },
      {
        value: "MODERATE",
        label: "Somewhat Important",
        description: "Nice to have, but not essential",
      },
      {
        value: "LOW",
        label: "Not Very Important",
        description: "More focused on activities and learning",
      },
    ],
    required: true,
  },

  // Social Media Active
  {
    id: "socialMediaActive",
    title: "📱 Are you active on social media?",
    description:
      "Many clubs use social platforms for communication and promotion",
    type: "switch",
    required: true,
  },

  // Competition Interest
  {
    id: "competitionInterest",
    title: "🏆 How do you feel about competitions?",
    description: "Some clubs are very competition-focused",
    type: "radio",
    options: [
      {
        value: "LOVE",
        label: "Love them!",
        description: "Thrive on competitive challenges",
      },
      {
        value: "ENJOY",
        label: "Enjoy participating",
        description: "Fun way to test skills",
      },
      {
        value: "OCCASIONAL",
        label: "Occasional participation",
        description: "Depends on the competition",
      },
      {
        value: "PREFER_AVOID",
        label: "Prefer to avoid",
        description: "More interested in collaborative activities",
      },
    ],
    required: true,
  },

  // Learning Style
  {
    id: "learningStyle",
    title: "🧠 How do you prefer to learn new things?",
    description:
      "This helps match you with clubs that teach in your preferred style",
    type: "radio",
    options: [
      {
        value: "HANDS_ON",
        label: "Hands-on Practice",
        description: "Learning by doing and experimenting",
      },
      {
        value: "STRUCTURED",
        label: "Structured Courses",
        description: "Step-by-step guided learning",
      },
      {
        value: "PEER_LEARNING",
        label: "Peer Learning",
        description: "Learning from and teaching others",
      },
      {
        value: "SELF_DIRECTED",
        label: "Self-directed Research",
        description: "Independent exploration and study",
      },
      {
        value: "MENTORSHIP",
        label: "Mentorship",
        description: "One-on-one guidance from experts",
      },
    ],
    required: true,
  },
];

export const DEFAULT_FORM_DATA: FormData = {
  branch: "",
  year: "",
  clubType: "BOTH",
  categories: [],
  primaryGoal: "",
  timeCommitment: "",
  skillLevel: "",
  workingStyle: "",
  eventPreference: "",
  leadershipInterest: "",
  techInterests: [],
  networkingImportance: "",
  socialMediaActive: false,
  competitionInterest: "",
  learningStyle: "",
};
