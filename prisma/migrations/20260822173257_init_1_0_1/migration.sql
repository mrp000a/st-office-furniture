/*
  Warnings:

  - You are about to drop the column `discount` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "discount",
ADD COLUMN     "discountAmount" DECIMAL(12,2) NOT NULL DEFAULT 0,
ADD COLUMN     "receiverEmail" TEXT,
ALTER COLUMN "paymentMethod" SET DEFAULT 'CASH_ON_DELIVERY';
