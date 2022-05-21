/*
  Warnings:

  - Added the required column `category` to the `comics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `edition` to the `comics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `comics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comics` ADD COLUMN `category` VARCHAR(255) NOT NULL,
    ADD COLUMN `edition` INTEGER NOT NULL,
    ADD COLUMN `year` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `categories` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
