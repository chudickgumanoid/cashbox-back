/*
  Warnings:

  - You are about to drop the column `addressId` on the `Cashbox` table. All the data in the column will be lost.
  - You are about to drop the column `cashierId` on the `Cashbox` table. All the data in the column will be lost.
  - Added the required column `address_id` to the `Cashbox` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cashier_id` to the `Cashbox` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cashbox" DROP CONSTRAINT "Cashbox_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Cashbox" DROP CONSTRAINT "Cashbox_cashierId_fkey";

-- AlterTable
ALTER TABLE "Cashbox" DROP COLUMN "addressId",
DROP COLUMN "cashierId",
ADD COLUMN     "address_id" INTEGER NOT NULL,
ADD COLUMN     "cashier_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Cashbox" ADD CONSTRAINT "Cashbox_cashier_id_fkey" FOREIGN KEY ("cashier_id") REFERENCES "Cashier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cashbox" ADD CONSTRAINT "Cashbox_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
