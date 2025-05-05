-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('EVENT', 'ORG');

-- CreateTable
CREATE TABLE "favorite_noti_history" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "itemType" "ItemType" NOT NULL,
    "orgId" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,
    "isFavorite" BOOLEAN NOT NULL,
    "isNotified" BOOLEAN NOT NULL,

    CONSTRAINT "favorite_noti_history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "favorite_noti_history" ADD CONSTRAINT "favorite_noti_history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_noti_history" ADD CONSTRAINT "favorite_noti_history_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
