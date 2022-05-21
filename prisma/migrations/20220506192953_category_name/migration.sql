/*
  Warnings:

  - Added the required column `categoryName` to the `comics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comics` ADD COLUMN `categoryName` VARCHAR(191) NOT NULL;
