/*
  Warnings:

  - You are about to drop the column `userId` on the `Note` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Note" DROP CONSTRAINT "Note_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Note" DROP COLUMN "userId";
