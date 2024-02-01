-- CreateEnum
CREATE TYPE "EnumCashierStatus" AS ENUM ('ACTIVE', 'BLOCKED', 'INACTIVE');

-- CreateTable
CREATE TABLE "Cashier" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "patronymic" TEXT NOT NULL,
    "iin" TEXT NOT NULL,
    "status" "EnumCashierStatus" NOT NULL DEFAULT 'INACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cashier_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cashier_login_key" ON "Cashier"("login");

-- CreateIndex
CREATE UNIQUE INDEX "Cashier_email_key" ON "Cashier"("email");
