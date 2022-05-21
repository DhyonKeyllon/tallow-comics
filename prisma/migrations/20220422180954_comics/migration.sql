/*
  Warnings:

  - You are about to alter the column `year` on the `comics` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.

*/
-- AlterTable
ALTER TABLE `comics` MODIFY `year` INTEGER NOT NULL;
