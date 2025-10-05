-- DropForeignKey
ALTER TABLE "Route" DROP CONSTRAINT "Route_eventId_fkey";

-- AlterTable
ALTER TABLE "Route" ALTER COLUMN "eventId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
