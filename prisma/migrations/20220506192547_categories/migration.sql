/*
  Warnings:

  - You are about to drop the column `comicId` on the `comic_categories` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `comics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comic_categories` DROP COLUMN `comicId`;

-- AlterTable
ALTER TABLE `comics` ADD COLUMN `categoryId` VARCHAR(191) NOT NULL;
