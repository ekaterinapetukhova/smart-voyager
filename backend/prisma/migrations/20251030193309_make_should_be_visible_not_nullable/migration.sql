/*
  Warnings:

  - Made the column `shouldBeVisible` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "shouldBeVisible" SET NOT NULL;

-- CreateTable
CREATE TABLE "_collaborator" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_collaborator_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_collaborator_B_index" ON "_collaborator"("B");

-- AddForeignKey
ALTER TABLE "_collaborator" ADD CONSTRAINT "_collaborator_A_fkey" FOREIGN KEY ("A") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_collaborator" ADD CONSTRAINT "_collaborator_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
