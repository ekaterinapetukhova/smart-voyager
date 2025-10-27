export enum Gender {
  Male = "male",
  Female = "female",
}

export const tripInterest = {
  history: "history",
  culture: "culture",
  food: "food",
  nature: "nature",
  sport: "sport",
  relaxation: "relaxation",
  events: "events",
  architecture: "architecture",
  photography: "photography",
  shopping: "shopping",
  nightlife: "nightlife",
} as const;

export type TripInterest = keyof typeof tripInterest;

export const tripGoals = {
  sharedTravelCosts: "Shared travel costs",
  safety: "Safety",
  meetingLocals: "Meeting locals",
  practicingLanguages: "Practicing languages",
  groupActivities: "Group activities",
  volunteering: "Volunteering",
  contentCreation: "Content creation",
  longTermCompanionship: "Long term companionship",
  spontaneousAdventures: "Spontaneous adventures",
  support: "Support",
} as const;

export type TripGoals = keyof typeof tripGoals;

export interface User {
  id: string;
  name: string;
  email: string;
  birthDate: Date;
  gender: Gender;
  avatar: string;
  country: string | null;
  city: string | null;
  languages: string | null;
  description: string | null;
  tripInterest: TripInterest[];
  tripGoals: TripGoals[];
}

export enum Currency {
  EUR = "eur",
  USD = "usd",
  PLN = "pln",
  BYN = "byn",
}
