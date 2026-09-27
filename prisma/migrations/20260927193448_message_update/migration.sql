-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "phone" TEXT,
ALTER COLUMN "email" DROP NOT NULL;
