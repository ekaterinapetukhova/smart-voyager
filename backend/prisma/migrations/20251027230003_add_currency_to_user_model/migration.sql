-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('eur', 'usd', 'pln', 'byn');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'eur';
