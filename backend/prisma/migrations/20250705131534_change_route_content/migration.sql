/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `RoutePoint` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `mode` on the `Route` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `Route` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `passwordHash` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RouteMode" AS ENUM ('drive', 'transit', 'bicycle', 'walk');

-- CreateEnum
CREATE TYPE "RouteType" AS ENUM ('balanced', 'short');

-- DropForeignKey
ALTER TABLE "RoutePoint" DROP CONSTRAINT "RoutePoint_routeId_fkey";

-- AlterTable
ALTER TABLE "Route" DROP COLUMN "mode",
ADD COLUMN     "mode" "RouteMode" NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "RouteType" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ADD COLUMN     "passwordHash" TEXT NOT NULL;

-- DropTable
DROP TABLE "RoutePoint";

-- CreateTable
CREATE TABLE "RouteWaypoint" (
    "id" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "name" TEXT,
    "routeId" TEXT NOT NULL,

    CONSTRAINT "RouteWaypoint_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RouteWaypoint" ADD CONSTRAINT "RouteWaypoint_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
