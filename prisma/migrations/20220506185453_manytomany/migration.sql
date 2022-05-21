/*
  Warnings:

  - You are about to drop the column `categoryId` on the `comics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `comics` DROP COLUMN `categoryId`;

-- CreateTable
CREATE TABLE `_CategoryToComic` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CategoryToComic_AB_unique`(`A`, `B`),
    INDEX `_CategoryToComic_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
