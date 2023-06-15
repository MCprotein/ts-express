/*
  Warnings:

  - You are about to alter the column `deletedAt` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `DateTime(3)`.
  - You are about to alter the column `deletedAt` on the `OrderItem` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `Order` MODIFY `deletedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `OrderItem` MODIFY `deletedAt` DATETIME(3) NOT NULL;
