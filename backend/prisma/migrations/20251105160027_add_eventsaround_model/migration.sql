-- CreateTable
CREATE TABLE "AroundEventsItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "city" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,

    CONSTRAINT "AroundEventsItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AroundEventsItem" ADD CONSTRAINT "AroundEventsItem_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;
