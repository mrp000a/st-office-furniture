/*
  Warnings:

  - The values [CASH_ON_DELIVERY] on the enum `PaymentMethods` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PaymentMethods_new" AS ENUM ('COD', 'BKASH', 'NAGAD', 'ROCKET', 'STRIPE', 'SSLCOMMERZ');
ALTER TABLE "public"."Order" ALTER COLUMN "paymentMethod" DROP DEFAULT;
ALTER TABLE "Order" ALTER COLUMN "paymentMethod" TYPE "PaymentMethods_new" USING ("paymentMethod"::text::"PaymentMethods_new");
ALTER TYPE "PaymentMethods" RENAME TO "PaymentMethods_old";
ALTER TYPE "PaymentMethods_new" RENAME TO "PaymentMethods";
DROP TYPE "public"."PaymentMethods_old";
ALTER TABLE "Order" ALTER COLUMN "paymentMethod" SET DEFAULT 'COD';
COMMIT;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "paymentMethod" SET DEFAULT 'COD';
