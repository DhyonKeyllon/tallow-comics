/*
  Warnings:

  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `comics_categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `categories`;

-- DropTable
DROP TABLE `comics_categories`;

-- CreateTable
CREATE TABLE `collections` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,
    `edition` VARCHAR(255) NOT NULL,
    `year` INTEGER NOT NULL,
    `category` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comic_collections` (
    `id` VARCHAR(191) NOT NULL,
    `comicId` VARCHAR(255) NOT NULL,
    `collectionId` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
