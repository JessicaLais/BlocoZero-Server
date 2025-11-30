/*
  Warnings:

  - You are about to alter the column `expDuration` on the `Substage` table. The data in that column could be lost. The data in that column will be cast from `Float` to `DateTime`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Substage" (
    "id_substage" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "expDuration" DATETIME NOT NULL,
    "progress" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Substage" ("createdAt", "expDuration", "id_substage", "name", "progress", "updatedAt") SELECT "createdAt", "expDuration", "id_substage", "name", "progress", "updatedAt" FROM "Substage";
DROP TABLE "Substage";
ALTER TABLE "new_Substage" RENAME TO "Substage";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
