-- CreateEnum
CREATE TYPE "OTPType" AS ENUM ('FORGOT_PASSWORD', 'REGISTER');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('PAYOS', 'MOMO');

-- CreateTable
CREATE TABLE "users" (
    "id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(10) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" INTEGER NOT NULL,
    "role_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "province" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "province_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_provinces" (
    "userId" TEXT NOT NULL,
    "provinceId" INTEGER NOT NULL,

    CONSTRAINT "user_provinces_pkey" PRIMARY KEY ("userId","provinceId")
);

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "otps" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "type" "OTPType" NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attempts" INTEGER NOT NULL,
    "requestToken" TEXT NOT NULL,

    CONSTRAINT "otps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "districts" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "provinceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "districts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" SERIAL NOT NULL,
    "street" VARCHAR(255) NOT NULL,
    "ward" VARCHAR(100) NOT NULL,
    "districtId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Form" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "deleteAt" TIMESTAMP(3),

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormAnswer" (
    "id" SERIAL NOT NULL,
    "formResponseId" INTEGER NOT NULL,
    "formInputId" INTEGER NOT NULL,
    "value" TEXT,

    CONSTRAINT "FormAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormInput" (
    "id" SERIAL NOT NULL,
    "formId" INTEGER NOT NULL,
    "fieldName" VARCHAR(255) NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT true,
    "regex" TEXT,
    "options" JSONB,
    "deleteAt" TIMESTAMP(3),

    CONSTRAINT "FormInput_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormResponse" (
    "id" SERIAL NOT NULL,
    "formId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "showingId" TEXT,

    CONSTRAINT "FormResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayOSInfo" (
    "bin" VARCHAR(20),
    "accountNumber" VARCHAR(50),
    "accountName" VARCHAR(100),
    "amount" INTEGER NOT NULL,
    "description" VARCHAR(100),
    "orderCode" INTEGER NOT NULL,
    "currency" VARCHAR(10),
    "paymentLinkId" VARCHAR(50),
    "status" VARCHAR(20),
    "checkoutUrl" TEXT,
    "qrCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiredAt" TEXT
);

-- CreateTable
CREATE TABLE "PaymentInfo" (
    "id" SERIAL NOT NULL,
    "method" "PaymentMethod" NOT NULL,
    "paymentCode" INTEGER NOT NULL,
    "paidAt" TIMESTAMP(3),
    "orderInfoId" TEXT,

    CONSTRAINT "PaymentInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentMethodStatus" (
    "paymentMethod" "PaymentMethod" NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "OrderInfo" (
    "id" TEXT NOT NULL,
    "showingId" TEXT NOT NULL,
    "ticketTypeId" TEXT,
    "userId" TEXT,
    "quantity" INTEGER,
    "seatId" INTEGER[],
    "status" INTEGER NOT NULL,

    CONSTRAINT "OrderInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketQRCode" (
    "id" TEXT NOT NULL,
    "qrCode" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "seatId" INTEGER,
    "ticketId" TEXT NOT NULL,
    "ticketTypeId" TEXT,

    CONSTRAINT "TicketQRCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventCategories" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "isSpecial" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "EventCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Images" (
    "id" SERIAL NOT NULL,
    "userId" TEXT DEFAULT 'TicketBox',
    "imageUrl" VARCHAR(255) NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "paymentId" INTEGER,
    "formResponseId" INTEGER,
    "mailSent" BOOLEAN NOT NULL DEFAULT false,
    "showingId" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Events" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "organizerId" TEXT,
    "locationId" INTEGER,
    "imgLogoId" INTEGER,
    "imgPosterId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isOnlyOnEve" BOOLEAN NOT NULL DEFAULT false,
    "isSpecial" BOOLEAN NOT NULL DEFAULT false,
    "lastScore" DECIMAL(10,2) NOT NULL,
    "totalClicks" INTEGER NOT NULL DEFAULT 0,
    "weekClicks" INTEGER NOT NULL DEFAULT 0,
    "venue" VARCHAR(100),
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "orgDescription" TEXT,
    "orgName" TEXT,
    "deleteAt" TIMESTAMP(3),
    "isOnline" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Row" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Row_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seat" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rowId" INTEGER NOT NULL,
    "positionX" DOUBLE PRECISION NOT NULL,
    "positionY" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "position" INTEGER NOT NULL,

    CONSTRAINT "Seat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "seatmapId" INTEGER NOT NULL,
    "isStage" BOOLEAN NOT NULL,
    "element" JSONB NOT NULL,
    "attribute" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isReservingSeat" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seatmap" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "viewBox" TEXT NOT NULL,
    "status" INTEGER NOT NULL,

    CONSTRAINT "Seatmap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Showing" (
    "id" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,
    "isFree" BOOLEAN NOT NULL,
    "isSalable" BOOLEAN NOT NULL,
    "isPresale" BOOLEAN NOT NULL,
    "seatMapId" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "isEnabledQueueWaiting" BOOLEAN NOT NULL,
    "showAllSeats" BOOLEAN NOT NULL,
    "formId" INTEGER,
    "deleteAt" TIMESTAMP(3),

    CONSTRAINT "Showing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketType" (
    "id" TEXT NOT NULL,
    "showingId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "isFree" BOOLEAN NOT NULL,
    "price" INTEGER NOT NULL,
    "originalPrice" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "position" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "maxQtyPerOrder" INTEGER NOT NULL,
    "minQtyPerOrder" INTEGER NOT NULL,
    "isHidden" BOOLEAN NOT NULL DEFAULT false,
    "quantity" INTEGER DEFAULT 0,
    "deleteAt" TIMESTAMP(3),

    CONSTRAINT "TicketType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeatStatus" (
    "id" TEXT NOT NULL,
    "showingId" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "seatId" INTEGER NOT NULL,
    "seatMapId" INTEGER NOT NULL,

    CONSTRAINT "SeatStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketTypeSection" (
    "ticketTypeId" TEXT NOT NULL,
    "sectionId" INTEGER NOT NULL,

    CONSTRAINT "TicketTypeSection_pkey" PRIMARY KEY ("ticketTypeId","sectionId")
);

-- CreateTable
CREATE TABLE "OrgPaymentInfo" (
    "id" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,
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

    CONSTRAINT "OrgPaymentInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventUserRelationship" (
    "eventId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" INTEGER NOT NULL,
    "role_desc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "EventUserRelationship_pkey" PRIMARY KEY ("eventId","userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_token_key" ON "refresh_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "otps_requestToken_key" ON "otps"("requestToken");

-- CreateIndex
CREATE INDEX "otps_email_idx" ON "otps"("email");

-- CreateIndex
CREATE INDEX "otps_otp_idx" ON "otps"("otp");

-- CreateIndex
CREATE UNIQUE INDEX "PayOSInfo_orderCode_key" ON "PayOSInfo"("orderCode");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentMethodStatus_paymentMethod_key" ON "PaymentMethodStatus"("paymentMethod");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_provinces" ADD CONSTRAINT "user_provinces_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "province"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_provinces" ADD CONSTRAINT "user_provinces_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_email_fkey" FOREIGN KEY ("email") REFERENCES "users"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "districts" ADD CONSTRAINT "districts_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "province"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "districts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormAnswer" ADD CONSTRAINT "FormAnswer_formInputId_fkey" FOREIGN KEY ("formInputId") REFERENCES "FormInput"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormAnswer" ADD CONSTRAINT "FormAnswer_formResponseId_fkey" FOREIGN KEY ("formResponseId") REFERENCES "FormResponse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormInput" ADD CONSTRAINT "FormInput_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormResponse" ADD CONSTRAINT "FormResponse_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormResponse" ADD CONSTRAINT "FormResponse_showingId_fkey" FOREIGN KEY ("showingId") REFERENCES "Showing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormResponse" ADD CONSTRAINT "FormResponse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentInfo" ADD CONSTRAINT "PaymentInfo_orderInfoId_fkey" FOREIGN KEY ("orderInfoId") REFERENCES "OrderInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketQRCode" ADD CONSTRAINT "TicketQRCode_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventCategories" ADD CONSTRAINT "EventCategories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventCategories" ADD CONSTRAINT "EventCategories_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_formResponseId_fkey" FOREIGN KEY ("formResponseId") REFERENCES "FormResponse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "PaymentInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_showingId_fkey" FOREIGN KEY ("showingId") REFERENCES "Showing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_imgLogoId_fkey" FOREIGN KEY ("imgLogoId") REFERENCES "Images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_imgPosterId_fkey" FOREIGN KEY ("imgPosterId") REFERENCES "Images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Row" ADD CONSTRAINT "Row_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_rowId_fkey" FOREIGN KEY ("rowId") REFERENCES "Row"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_seatmapId_fkey" FOREIGN KEY ("seatmapId") REFERENCES "Seatmap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Showing" ADD CONSTRAINT "Showing_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Showing" ADD CONSTRAINT "Showing_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Showing" ADD CONSTRAINT "Showing_seatMapId_fkey" FOREIGN KEY ("seatMapId") REFERENCES "Seatmap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketType" ADD CONSTRAINT "TicketType_showingId_fkey" FOREIGN KEY ("showingId") REFERENCES "Showing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeatStatus" ADD CONSTRAINT "SeatStatus_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "Seat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeatStatus" ADD CONSTRAINT "SeatStatus_showingId_fkey" FOREIGN KEY ("showingId") REFERENCES "Showing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketTypeSection" ADD CONSTRAINT "TicketTypeSection_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketTypeSection" ADD CONSTRAINT "TicketTypeSection_ticketTypeId_fkey" FOREIGN KEY ("ticketTypeId") REFERENCES "TicketType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventUserRelationship" ADD CONSTRAINT "EventUserRelationship_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventUserRelationship" ADD CONSTRAINT "EventUserRelationship_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
