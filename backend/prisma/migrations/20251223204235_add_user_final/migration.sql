/*
  Warnings:

  - Made the column `userId` on table `Stock` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Warehouse` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Stock" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Warehouse" ALTER COLUMN "userId" SET NOT NULL;
