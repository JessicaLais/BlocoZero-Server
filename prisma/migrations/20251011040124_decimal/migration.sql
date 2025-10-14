/*
  Warnings:

  - You are about to alter the column `hourlyRate` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - Made the column `hourlyRate` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "enterprise_id" INTEGER NOT NULL,
    "position" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "hourlyRate" REAL NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "User_enterprise_id_fkey" FOREIGN KEY ("enterprise_id") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("createdAt", "email", "enterprise_id", "hourlyRate", "id", "isActive", "name", "password", "phone", "position", "updatedAt") SELECT "createdAt", "email", "enterprise_id", "hourlyRate", "id", "isActive", "name", "password", "phone", "position", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
