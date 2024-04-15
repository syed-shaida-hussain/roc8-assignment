/*
  Warnings:

  - Added the required column `verifyToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verifyTokenExpiry` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verifyToken" TEXT NOT NULL,
ADD COLUMN     "verifyTokenExpiry" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL;
