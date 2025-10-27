/*
  Warnings:

  - The values [SharedTravelCosts,Safety,MeetingLocals,PracticingLanguages,GroupActivities,Volunteering,ContentCreation,LongTermCompanionship,SpontaneousAdventures,Support] on the enum `TripGoals` will be removed. If these variants are still used in the database, this will fail.
  - The values [History,Culture,Food,Nature,Sport,Relaxation,Events,Architecture,Photography,Shopping,Nightlife] on the enum `TripInterest` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TripGoals_new" AS ENUM ('sharedTravelCosts', 'safety', 'meetingLocals', 'practicingLanguages', 'groupActivities', 'volunteering', 'contentCreation', 'longTermCompanionship', 'spontaneousAdventures', 'support');
ALTER TABLE "User" ALTER COLUMN "tripGoals" TYPE "TripGoals_new"[] USING ("tripGoals"::text::"TripGoals_new"[]);
ALTER TYPE "TripGoals" RENAME TO "TripGoals_old";
ALTER TYPE "TripGoals_new" RENAME TO "TripGoals";
DROP TYPE "TripGoals_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TripInterest_new" AS ENUM ('history', 'culture', 'food', 'nature', 'sport', 'relaxation', 'events', 'architecture', 'photography', 'shopping', 'nightlife');
ALTER TABLE "User" ALTER COLUMN "tripInterest" TYPE "TripInterest_new"[] USING ("tripInterest"::text::"TripInterest_new"[]);
ALTER TYPE "TripInterest" RENAME TO "TripInterest_old";
ALTER TYPE "TripInterest_new" RENAME TO "TripInterest";
DROP TYPE "TripInterest_old";
COMMIT;
