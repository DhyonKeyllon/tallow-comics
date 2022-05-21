/*
  Warnings:

  - You are about to drop the column `category` on the `comics` table. All the data in the column will be lost.
  - You are about to alter the column `edition` on the `comics` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `year` on the `comics` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - Added the required column `categoryId` to the `comics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comics` DROP COLUMN `category`,
    ADD COLUMN `categoryId` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(400) NOT NULL,
    MODIFY `edition` VARCHAR(100) NOT NULL,
    MODIFY `year` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `comic_categories` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
