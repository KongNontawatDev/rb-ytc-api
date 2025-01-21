-- AlterTable
ALTER TABLE `admin` ADD COLUMN `refresh_token` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `booking_list` ADD COLUMN `status` INTEGER NOT NULL DEFAULT 1;
