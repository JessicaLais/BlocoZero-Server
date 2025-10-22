/*
  Warnings:

  - Added the required column `isActive` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id_user" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "enterprise_id" INTEGER NOT NULL,
    "userFunction" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "works" TEXT NOT NULL,
    "hourlyRate" REAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    CONSTRAINT "User_enterprise_id_fkey" FOREIGN KEY ("enterprise_id") REFERENCES "Enterprise" ("id_entreprise") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("createdAt", "email", "enterprise_id", "hourlyRate", "id_user", "name", "password", "phone", "updatedAt", "userFunction", "works") SELECT "createdAt", "email", "enterprise_id", "hourlyRate", "id_user", "name", "password", "phone", "updatedAt", "userFunction", "works" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
