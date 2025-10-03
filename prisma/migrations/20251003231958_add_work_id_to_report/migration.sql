/*
  Warnings:

  - Added the required column `work_id` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Report" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "work_id" INTEGER NOT NULL,
    "percentual" REAL NOT NULL,
    "qtd_work" REAL NOT NULL,
    "weather" TEXT NOT NULL,
    "ocurrence" TEXT NOT NULL,
    "stage" TEXT NOT NULL,
    "date_register" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendente'
);
INSERT INTO "new_Report" ("date_register", "id", "ocurrence", "percentual", "qtd_work", "stage", "status", "weather") SELECT "date_register", "id", "ocurrence", "percentual", "qtd_work", "stage", "status", "weather" FROM "Report";
DROP TABLE "Report";
ALTER TABLE "new_Report" RENAME TO "Report";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
