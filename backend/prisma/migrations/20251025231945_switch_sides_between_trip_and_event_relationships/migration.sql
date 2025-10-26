/*
  Warnings:

  - You are about to drop the column `eventId` on the `Trip` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tripId]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tripId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_eventId_fkey";

-- DropIndex
DROP INDEX "Trip_eventId_key";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "tripId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "eventId";

-- CreateIndex
CREATE UNIQUE INDEX "Event_tripId_key" ON "Event"("tripId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
