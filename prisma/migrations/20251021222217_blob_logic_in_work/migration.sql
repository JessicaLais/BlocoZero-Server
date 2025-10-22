/*
  Warnings:

  - You are about to drop the column `photo_url` on the `Work` table. All the data in the column will be lost.
  - Added the required column `photo` to the `Work` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Work" (
    "id_work" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_entreprise" INTEGER NOT NULL,
    "id_manager" INTEGER NOT NULL,
    "id_tender" INTEGER,
    "title" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "budget" REAL NOT NULL,
    "start_time" DATETIME NOT NULL,
    "end_time" DATETIME NOT NULL,
    "describe" TEXT NOT NULL,
    "photo" BLOB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Work_id_entreprise_fkey" FOREIGN KEY ("id_entreprise") REFERENCES "Enterprise" ("id_entreprise") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Work" ("address", "budget", "cep", "cnpj", "createdAt", "describe", "end_time", "id_entreprise", "id_manager", "id_tender", "id_work", "start_time", "title", "updatedAt") SELECT "address", "budget", "cep", "cnpj", "createdAt", "describe", "end_time", "id_entreprise", "id_manager", "id_tender", "id_work", "start_time", "title", "updatedAt" FROM "Work";
DROP TABLE "Work";
ALTER TABLE "new_Work" RENAME TO "Work";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
