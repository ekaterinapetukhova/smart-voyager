/*
  Warnings:

  - You are about to drop the column `bestWay` on the `Route` table. All the data in the column will be lost.
  - Added the required column `geojson` to the `Route` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Route" DROP COLUMN "bestWay",
ADD COLUMN     "geojson" JSONB NOT NULL;
