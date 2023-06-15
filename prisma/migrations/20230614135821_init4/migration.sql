/*
  Warnings:

  - Added the required column `deletedAt` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deletedAt` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Order` ADD COLUMN `deletedAt` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `OrderItem` ADD COLUMN `deletedAt` VARCHAR(255) NOT NULL;
