/*
  Warnings:

  - You are about to drop the column `chatId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_chatId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "chatId";

-- CreateTable
CREATE TABLE "_chatMembers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_chatMembers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_chatMembers_B_index" ON "_chatMembers"("B");

-- AddForeignKey
ALTER TABLE "_chatMembers" ADD CONSTRAINT "_chatMembers_A_fkey" FOREIGN KEY ("A") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_chatMembers" ADD CONSTRAINT "_chatMembers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
