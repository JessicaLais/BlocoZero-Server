/*
  Warnings:

  - Made the column `enterprise_id` on table `Manager` required. This step will fail if there are existing NULL values in that column.
  - Made the column `enterprise_id` on table `Tender` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Manager" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "enterprise_id" INTEGER NOT NULL,
    CONSTRAINT "Manager_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Manager_enterprise_id_fkey" FOREIGN KEY ("enterprise_id") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Manager" ("enterprise_id", "id", "user_id") SELECT "enterprise_id", "id", "user_id" FROM "Manager";
DROP TABLE "Manager";
ALTER TABLE "new_Manager" RENAME TO "Manager";
CREATE UNIQUE INDEX "Manager_user_id_key" ON "Manager"("user_id");
CREATE TABLE "new_Tender" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "enterprise_id" INTEGER NOT NULL,
    CONSTRAINT "Tender_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tender_enterprise_id_fkey" FOREIGN KEY ("enterprise_id") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tender" ("enterprise_id", "id", "user_id") SELECT "enterprise_id", "id", "user_id" FROM "Tender";
DROP TABLE "Tender";
ALTER TABLE "new_Tender" RENAME TO "Tender";
CREATE UNIQUE INDEX "Tender_user_id_key" ON "Tender"("user_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
