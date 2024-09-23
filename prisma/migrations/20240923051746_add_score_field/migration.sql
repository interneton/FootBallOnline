/*
  Warnings:

  - A unique constraint covering the columns `[account]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `users_account_key` ON `users`(`account`);
