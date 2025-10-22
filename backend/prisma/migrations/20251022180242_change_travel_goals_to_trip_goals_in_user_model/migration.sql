/*
  Warnings:

  - You are about to drop the column `travelGoals` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "travelGoals",
ADD COLUMN     "tripGoals" "TripGoals"[];
