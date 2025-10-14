/*
  Warnings:

  - You are about to drop the `DefectReport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Work` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserWorks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DefectReport";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Item";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Usage";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Work";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_UserWorks";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Manager" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "work_id" INTEGER,
    CONSTRAINT "Manager_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tender" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "work_id" INTEGER,
    CONSTRAINT "Tender_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ManagerTender" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "manager_id" INTEGER NOT NULL,
    "tender_id" INTEGER NOT NULL,
    CONSTRAINT "ManagerTender_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "Manager" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ManagerTender_tender_id_fkey" FOREIGN KEY ("tender_id") REFERENCES "Tender" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Manager_user_id_key" ON "Manager"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Tender_user_id_key" ON "Tender"("user_id");
