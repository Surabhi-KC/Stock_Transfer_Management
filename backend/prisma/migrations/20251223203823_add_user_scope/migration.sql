/*
  Warnings:

  - The primary key for the `Stock` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "Stock_warehouseId_productName_key";

-- AlterTable
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_pkey",
ADD COLUMN     "userId" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ADD CONSTRAINT "Stock_pkey" PRIMARY KEY ("warehouseId", "productName");
DROP SEQUENCE "Stock_id_seq";

-- AlterTable
ALTER TABLE "Warehouse" ADD COLUMN     "userId" TEXT;
