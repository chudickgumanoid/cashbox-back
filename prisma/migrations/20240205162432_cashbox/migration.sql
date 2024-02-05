-- CreateEnum
CREATE TYPE "EnumCashboxStatus" AS ENUM ('ACTIVE', 'BLOCKED');

-- CreateEnum
CREATE TYPE "EnumPayment" AS ENUM ('CASH', 'CARD', 'MOBILE');

-- CreateEnum
CREATE TYPE "EnumDiscount" AS ENUM ('PERCENT', 'CASH');

-- CreateEnum
CREATE TYPE "EnumMarkup" AS ENUM ('PERCENT', 'CASH');

-- CreateEnum
CREATE TYPE "EnumVat" AS ENUM ('VAT_12', 'NO_VAT');

-- CreateEnum
CREATE TYPE "EnumTicketOperation" AS ENUM ('BUY', 'SELL', 'BUY_RETURN', 'SELL_RETURN');

-- CreateTable
CREATE TABLE "Cashbox" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "serial_number" TEXT NOT NULL,
    "cashierId" INTEGER NOT NULL,
    "addressId" INTEGER NOT NULL,
    "cashbox_config_id" INTEGER NOT NULL,
    "status" "EnumCashboxStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cashbox_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CashboxConfig" (
    "id" SERIAL NOT NULL,
    "auto_close_time" TEXT NOT NULL,
    "cash_sum" INTEGER NOT NULL,
    "discount_type" "EnumDiscount" NOT NULL DEFAULT 'CASH',
    "matkup_type" "EnumMarkup" NOT NULL DEFAULT 'CASH',
    "email_for_report" TEXT,
    "is_open" BOOLEAN NOT NULL,
    "max_sum" INTEGER NOT NULL,
    "number_shift" INTEGER NOT NULL,
    "open_time" TIMESTAMP(3) NOT NULL,
    "close_time" TIMESTAMP(3) NOT NULL,
    "pincode" TEXT NOT NULL DEFAULT '0000',
    "payment_type" "EnumPayment" NOT NULL DEFAULT 'CASH',
    "ticket_number" INTEGER NOT NULL,
    "vat" "EnumVat" NOT NULL DEFAULT 'VAT_12',
    "withdrawal" BOOLEAN NOT NULL DEFAULT false,
    "default_measure_id" INTEGER NOT NULL,

    CONSTRAINT "CashboxConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Measure" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Measure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "cashier_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "sum" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "operation" "EnumTicketOperation" NOT NULL,
    "data" JSONB NOT NULL,
    "cashbox_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cashbox_serial_number_key" ON "Cashbox"("serial_number");

-- CreateIndex
CREATE UNIQUE INDEX "Measure_code_key" ON "Measure"("code");

-- AddForeignKey
ALTER TABLE "Cashbox" ADD CONSTRAINT "Cashbox_cashierId_fkey" FOREIGN KEY ("cashierId") REFERENCES "Cashier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cashbox" ADD CONSTRAINT "Cashbox_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cashbox" ADD CONSTRAINT "Cashbox_cashbox_config_id_fkey" FOREIGN KEY ("cashbox_config_id") REFERENCES "CashboxConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashboxConfig" ADD CONSTRAINT "CashboxConfig_default_measure_id_fkey" FOREIGN KEY ("default_measure_id") REFERENCES "Measure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_cashier_id_fkey" FOREIGN KEY ("cashier_id") REFERENCES "Cashier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_cashbox_id_fkey" FOREIGN KEY ("cashbox_id") REFERENCES "Cashbox"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
