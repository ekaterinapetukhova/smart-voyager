-- DropForeignKey
ALTER TABLE "ControlListItem" DROP CONSTRAINT "ControlListItem_tripId_fkey";

-- DropForeignKey
ALTER TABLE "TripEvent" DROP CONSTRAINT "TripEvent_tripId_fkey";

-- DropForeignKey
ALTER TABLE "TripPoint" DROP CONSTRAINT "TripPoint_tripId_fkey";

-- AddForeignKey
ALTER TABLE "TripPoint" ADD CONSTRAINT "TripPoint_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ControlListItem" ADD CONSTRAINT "ControlListItem_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripEvent" ADD CONSTRAINT "TripEvent_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;
