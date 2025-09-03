/*
  Warnings:

  - Added the required column `quantity` to the `Usage` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "itemId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "workId" INTEGER NOT NULL,
    "lote" TEXT NOT NULL,
    "usedAt" DATETIME NOT NULL,
    "purpose" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Usage_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Usage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Usage_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Usage" ("createdAt", "id", "itemId", "lote", "purpose", "usedAt", "userId", "workId") SELECT "createdAt", "id", "itemId", "lote", "purpose", "usedAt", "userId", "workId" FROM "Usage";
DROP TABLE "Usage";
ALTER TABLE "new_Usage" RENAME TO "Usage";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
