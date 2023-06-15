/*
  Warnings:

  - You are about to alter the column `deletedAt` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deletedAt` on the `OrderItem` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `Order` MODIFY `deletedAt` DATETIME NULL;

-- AlterTable
ALTER TABLE `OrderItem` MODIFY `deletedAt` DATETIME NULL;
