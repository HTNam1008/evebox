-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('EVENT', 'ORG');

-- CreateTable
CREATE TABLE "org_payment_infor" (
    "id" TEXT NOT NULL,
    "organizerId" TEXT NOT NULL,
    "accountName" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "businessType" INTEGER NOT NULL,
    "fullName" TEXT,
    "address" TEXT,
    "taxCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "org_payment_infor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorite_noti_history" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "itemType" "ItemType" NOT NULL,
    "orgId" TEXT,
    "eventId" INTEGER,
    "isFavorite" BOOLEAN NOT NULL,
    "isNotified" BOOLEAN NOT NULL,

    CONSTRAINT "favorite_noti_history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "favorite_noti_history" ADD CONSTRAINT "favorite_noti_history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_noti_history" ADD CONSTRAINT "favorite_noti_history_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"("id") ON DELETE SET NULL ON UPDATE CASCADE;
