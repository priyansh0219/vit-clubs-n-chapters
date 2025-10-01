export interface GravitasEvent {
  name: string;
  type:
    | "Competition"
    | "Games"
    | "Entertainment"
    | "Startup"
    | "Workshop"
    | "Cultural"
    | "Technical"
    | "Social";
  description: string;
  club: string;
  short_description: string;
  tagline: string;
  image: string;
  start_date: string;
  end_date: string;
}

export interface EventsByClub {
  [clubName: string]: GravitasEvent[];
}
