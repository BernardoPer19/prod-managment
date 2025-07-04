/*
  Warnings:

  - You are about to drop the column `rol_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_rol_id_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "rol_id";

-- DropTable
DROP TABLE "Role";
