-- CreateTable
CREATE TABLE "ShowingTicketTypeQuantity" (
    "id" TEXT NOT NULL,
    "showingId" TEXT NOT NULL,
    "ticketTypeId" TEXT NOT NULL,

    CONSTRAINT "ShowingTicketTypeQuantity_pkey" PRIMARY KEY ("id")
);
