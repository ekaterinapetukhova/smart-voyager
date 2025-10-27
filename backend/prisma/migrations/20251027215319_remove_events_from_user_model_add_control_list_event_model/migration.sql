/*
  Warnings:

  - You are about to drop the column `controlList` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `TripEvent` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TripEvent" DROP CONSTRAINT "TripEvent_userId_fkey";

-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "controlList";

-- AlterTable
ALTER TABLE "TripEvent" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "shouldBeVisible" SET DEFAULT false;

-- CreateTable
CREATE TABLE "ControlListItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "tripid" TEXT NOT NULL,

    CONSTRAINT "ControlListItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ControlListItem" ADD CONSTRAINT "ControlListItem_tripid_fkey" FOREIGN KEY ("tripid") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
