/*
  Warnings:

  - The primary key for the `Stock` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_pkey",
ADD CONSTRAINT "Stock_pkey" PRIMARY KEY ("userId", "warehouseId", "productName");
