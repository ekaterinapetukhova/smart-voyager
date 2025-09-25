/*
  Warnings:

  - Added the required column `from` to the `Route` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to` to the `Route` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TripInterest" AS ENUM ('History', 'Culture', 'Food', 'Nature', 'Sport', 'Relaxation', 'Events', 'Architecture', 'Photography', 'Shopping', 'Nightlife');

-- CreateEnum
CREATE TYPE "TripGoals" AS ENUM ('SharedTravelCosts', 'Safety', 'MeetingLocals', 'PracticingLanguages', 'GroupActivities', 'Volunteering', 'ContentCreation', 'LongTermCompanionship', 'SpontaneousAdventures', 'Support');

-- AlterTable
ALTER TABLE "Route" ADD COLUMN     "from" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "to" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "travelGoals" "TripGoals"[],
ADD COLUMN     "tripInterest" "TripInterest"[];

-- CreateTable
CREATE TABLE "Calendar" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Calendar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Calendar_userId_key" ON "Calendar"("userId");

-- AddForeignKey
ALTER TABLE "Calendar" ADD CONSTRAINT "Calendar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
