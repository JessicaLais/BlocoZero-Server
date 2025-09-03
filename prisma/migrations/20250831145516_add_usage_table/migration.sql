/*
  Warnings:

  - You are about to drop the column `item_id` on the `Usage` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Usage` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Usage` table. All the data in the column will be lost.
  - You are about to drop the column `work_id` on the `Usage` table. All the data in the column will be lost.
  - Added the required column `itemId` to the `Usage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Usage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workId` to the `Usage` table without a default value. This is not possible if the table is not empty.
  - Made the column `lote` on table `Usage` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "itemId" INTEGER NOT NULL,
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
INSERT INTO "new_Usage" ("id", "lote", "purpose", "usedAt") SELECT "id", "lote", "purpose", "usedAt" FROM "Usage";
DROP TABLE "Usage";
ALTER TABLE "new_Usage" RENAME TO "Usage";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
