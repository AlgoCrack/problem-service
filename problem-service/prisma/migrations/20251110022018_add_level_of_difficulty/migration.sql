/*
  Warnings:

  - Added the required column `level_of_difficulty` to the `Problem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "problem"."Problem" ADD COLUMN     "level_of_difficulty" TEXT NOT NULL;
