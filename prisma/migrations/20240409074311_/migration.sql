/*
  Warnings:

  - Added the required column `note` to the `Appointments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointments" ADD COLUMN     "note" TEXT NOT NULL;
