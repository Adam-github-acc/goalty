/*
  Warnings:

  - You are about to drop the `nfccard` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `nfccard` DROP FOREIGN KEY `NfcCard_user_id_fkey`;

-- DropTable
DROP TABLE `nfccard`;
