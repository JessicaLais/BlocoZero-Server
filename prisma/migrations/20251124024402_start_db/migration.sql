/*
  Warnings:

  - You are about to drop the column `id_category` on the `Type` table. All the data in the column will be lost.
  - Added the required column `id_type` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `work_id` to the `Type` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Category" (
    "id_category" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_type" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "Category_id_type_fkey" FOREIGN KEY ("id_type") REFERENCES "Type" ("id_type") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Category" ("id_category", "name") SELECT "id_category", "name" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE TABLE "new_Type" (
    "id_type" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "work_id" INTEGER NOT NULL,
    CONSTRAINT "Type_work_id_fkey" FOREIGN KEY ("work_id") REFERENCES "Work" ("id_work") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Type" ("id_type", "name") SELECT "id_type", "name" FROM "Type";
DROP TABLE "Type";
ALTER TABLE "new_Type" RENAME TO "Type";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
