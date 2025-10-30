/*
  Warnings:

  - You are about to drop the column `tripid` on the `ControlListItem` table. All the data in the column will be lost.
  - Added the required column `tripId` to the `ControlListItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ControlListItem" DROP CONSTRAINT "ControlListItem_tripid_fkey";

-- AlterTable
ALTER TABLE "ControlListItem" DROP COLUMN "tripid",
ADD COLUMN     "tripId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ControlListItem" ADD CONSTRAINT "ControlListItem_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
