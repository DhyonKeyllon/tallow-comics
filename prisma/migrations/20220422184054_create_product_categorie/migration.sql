-- CreateTable
CREATE TABLE `comics_categories` (
    `id` VARCHAR(191) NOT NULL,
    `id_comic` VARCHAR(191) NOT NULL,
    `id_category` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
