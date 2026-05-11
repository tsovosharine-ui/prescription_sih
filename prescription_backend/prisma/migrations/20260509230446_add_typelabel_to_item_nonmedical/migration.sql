/*
  Warnings:

  - Added the required column `typeLabel` to the `ItemNonMedical` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ItemNonMedical" ADD COLUMN     "typeLabel" TEXT NOT NULL;
