/*
  Warnings:

  - You are about to drop the `_CategoryToComic` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `comic_categories` ADD COLUMN `comicId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `_CategoryToComic`;
