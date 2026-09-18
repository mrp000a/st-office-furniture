/*
  Warnings:

  - A unique constraint covering the columns `[userId,productId]` on the table `ProReview` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `ProReview` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ProReview" ALTER COLUMN "userId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ProReview_userId_productId_key" ON "ProReview"("userId", "productId");
