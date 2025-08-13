/*
  Warnings:

  - Added the required column `routeId` to the `RoutePoint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RoutePoint" ADD COLUMN     "routeId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Route" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RoutePoint" ADD CONSTRAINT "RoutePoint_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
