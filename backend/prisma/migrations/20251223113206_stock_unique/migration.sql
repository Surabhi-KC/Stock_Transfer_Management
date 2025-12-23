/*
  Warnings:

  - A unique constraint covering the columns `[warehouseId,productName]` on the table `Stock` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Stock_warehouseId_productName_key" ON "Stock"("warehouseId", "productName");
