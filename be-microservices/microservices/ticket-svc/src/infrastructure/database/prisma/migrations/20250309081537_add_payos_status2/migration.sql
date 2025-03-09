-- CreateTable
CREATE TABLE "PaymentMethodStatus" (
    "paymentMethod" "PaymentMethod" NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "PaymentMethodStatus_paymentMethod_key" ON "PaymentMethodStatus"("paymentMethod");
