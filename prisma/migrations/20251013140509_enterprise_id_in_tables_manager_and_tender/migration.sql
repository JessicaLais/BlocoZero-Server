/*
  Warnings:

  - You are about to drop the column `work_id` on the `Manager` table. All the data in the column will be lost.
  - You are about to drop the column `work_id` on the `Tender` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Manager" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "enterprise_id" INTEGER,
    CONSTRAINT "Manager_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Manager" ("id", "user_id") SELECT "id", "user_id" FROM "Manager";
DROP TABLE "Manager";
ALTER TABLE "new_Manager" RENAME TO "Manager";
CREATE UNIQUE INDEX "Manager_user_id_key" ON "Manager"("user_id");
CREATE TABLE "new_Tender" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "enterprise_id" INTEGER,
    CONSTRAINT "Tender_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tender" ("id", "user_id") SELECT "id", "user_id" FROM "Tender";
DROP TABLE "Tender";
ALTER TABLE "new_Tender" RENAME TO "Tender";
CREATE UNIQUE INDEX "Tender_user_id_key" ON "Tender"("user_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
