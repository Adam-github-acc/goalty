/*
  Warnings:

  - You are about to drop the column `birth_date` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `is_owner` on the `user` table. All the data in the column will be lost.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `goalsusers` MODIFY `progress` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `birth_date`,
    DROP COLUMN `is_owner`,
    ADD COLUMN `password` VARCHAR(191) NULL,
    ADD COLUMN `role` BOOLEAN NOT NULL,
    ADD COLUMN `salt` VARCHAR(191) NULL;
