-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `account` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `cash_amount` INTEGER NOT NULL DEFAULT 1000,
    `team_name` VARCHAR(191) NOT NULL,
    `score` INTEGER NOT NULL DEFAULT 1000,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `match_managers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `win_count` INTEGER NOT NULL DEFAULT 0,
    `loss_count` INTEGER NOT NULL DEFAULT 0,
    `draw_count` INTEGER NOT NULL DEFAULT 0,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_players` (
    `user_player_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `soccer_player_id` INTEGER NOT NULL,
    `is_equipped` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`user_player_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `soccer_players` (
    `soccer_player_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `speed` INTEGER NOT NULL,
    `goal_decision` INTEGER NOT NULL,
    `shoot_power` INTEGER NOT NULL,
    `defense` INTEGER NOT NULL,
    `stamina` INTEGER NOT NULL,
    `rank` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`soccer_player_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `packs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `sspb` INTEGER NOT NULL,
    `apb` INTEGER NOT NULL,
    `bpb` INTEGER NOT NULL,
    `cpb` INTEGER NOT NULL,
    `fpb` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fight_records` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `opponentname` VARCHAR(191) NOT NULL,
    `result` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `match_managers` ADD CONSTRAINT `match_managers_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_players` ADD CONSTRAINT `user_players_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_players` ADD CONSTRAINT `user_players_soccer_player_id_fkey` FOREIGN KEY (`soccer_player_id`) REFERENCES `soccer_players`(`soccer_player_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
