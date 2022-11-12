/*
  Warnings:

  - Added the required column `location` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `company` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `company` ADD COLUMN `location` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(255) NOT NULL;
