/*
  Warnings:

  - Added the required column `mode` to the `Route` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Route" ADD COLUMN     "mode" TEXT NOT NULL,
ALTER COLUMN "bestWay" DROP NOT NULL;
