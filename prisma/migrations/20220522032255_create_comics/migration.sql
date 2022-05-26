-- AlterTable
ALTER TABLE `comics` ADD COLUMN `comicGroupId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `comic_groups` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(400) NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,
    `edition` VARCHAR(100) NOT NULL,
    `year` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `categoryName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
