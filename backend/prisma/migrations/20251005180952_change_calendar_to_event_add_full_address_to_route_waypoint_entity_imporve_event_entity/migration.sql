/*
  Warnings:

  - You are about to drop the column `from` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the column `to` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the `Calendar` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[eventId]` on the table `Route` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `eventId` to the `Route` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Route` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `fullAddress` to the `RouteWaypoint` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `RouteWaypoint` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Calendar" DROP CONSTRAINT "Calendar_userId_fkey";

-- DropForeignKey
ALTER TABLE "Route" DROP CONSTRAINT "Route_userId_fkey";

-- AlterTable
ALTER TABLE "Route" DROP COLUMN "from",
DROP COLUMN "to",
ADD COLUMN     "eventId" TEXT NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "RouteWaypoint" ADD COLUMN     "fullAddress" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- DropTable
DROP TABLE "Calendar";

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Route_eventId_key" ON "Route"("eventId");

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
