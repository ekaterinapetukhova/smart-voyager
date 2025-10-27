/*
  Warnings:

  - Added the required column `city` to the `TripPoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `TripPoint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "budgetAnalysis" TEXT,
ADD COLUMN     "controlList" TEXT;

-- AlterTable
ALTER TABLE "TripPoint" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL;
