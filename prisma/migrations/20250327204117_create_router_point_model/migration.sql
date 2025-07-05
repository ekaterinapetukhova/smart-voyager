-- CreateTable
CREATE TABLE "RoutePoint" (
    "id" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "name" TEXT,

    CONSTRAINT "RoutePoint_pkey" PRIMARY KEY ("id")
);
