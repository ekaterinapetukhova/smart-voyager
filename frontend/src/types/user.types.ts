import z from "zod/v4";

export enum Gender {
  Male = "male",
  Female = "female",
}

export const tripInterest = {
  history: "History",
  culture: "Culture",
  food: "Food",
  nature: "Nature",
  sport: "Sport",
  relaxation: "Relaxation",
  events: "Events",
  architecture: "Architecture",
  photography: "Photography",
  shopping: "Shopping",
  nightlife: "Nightlife",
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

export enum Currency {
  EUR = "eur",
  USD = "usd",
  PLN = "pln",
  BYN = "byn",
}

export const userSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  gender: z.enum(Gender),
  email: z.email(),
  birthDate: z.coerce.date(),
  country: z.string().nullish(),
  city: z.string().nullish(),
  languages: z.string().nullish(),
  description: z.string().nullish(),
  avatar: z.base64(),
  tripInterest: z.array(z.enum(Object.keys(tripInterest))).max(3),
  tripGoals: z.array(z.enum(Object.keys(tripGoals))).max(3),
  currency: z.enum(Currency),
  shouldBeVisible: z.boolean(),
});

export type User = z.output<typeof userSchema>;
