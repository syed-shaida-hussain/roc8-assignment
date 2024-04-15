/*
  Warnings:

  - Changed the type of `verifyTokenExpiry` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "verifyTokenExpiry",
ADD COLUMN     "verifyTokenExpiry" TIMESTAMP(3) NOT NULL;
