export enum Gender {
  Male = "male",
  Female = "female",
}

enum TripInterest {
  History = "history",
  Culture = "culture",
  Food = "food",
  Nature = "nature",
  Sport = "sport",
  Relaxation = "relaxation",
  Events = "events",
  Architecture = "architecture",
  Photography = "photography",
  Shopping = "shopping",
  Nightlife = "nightlife",
}

enum TripGoals {
  SharedTravelCosts = "sharedTravelCosts",
  Safety = "safety",
  MeetingLocals = "meetingLocals",
  PracticingLanguages = "practicingLanguages",
  GroupActivities = "groupActivities",
  Volunteering = "volunteering",
  ContentCreation = "contentCreation",
  LongTermCompanionship = "longTermCompanionship",
  SpontaneousAdventures = "spontaneousAdventures",
  Support = "support",
}

export interface User {
  id: string;
  name: string;
  surname: string;
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
