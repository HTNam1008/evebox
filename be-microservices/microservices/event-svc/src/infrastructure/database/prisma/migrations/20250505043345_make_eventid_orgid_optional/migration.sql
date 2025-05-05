-- DropForeignKey
ALTER TABLE "favorite_noti_history" DROP CONSTRAINT "favorite_noti_history_eventId_fkey";

-- AlterTable
ALTER TABLE "favorite_noti_history" ALTER COLUMN "orgId" DROP NOT NULL,
ALTER COLUMN "eventId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "favorite_noti_history" ADD CONSTRAINT "favorite_noti_history_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"("id") ON DELETE SET NULL ON UPDATE CASCADE;
