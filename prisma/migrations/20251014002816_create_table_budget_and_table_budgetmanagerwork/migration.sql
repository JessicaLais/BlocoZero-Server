/*
  Warnings:

  - You are about to drop the column `executed_value` on the `Budget` table. All the data in the column will be lost.
  - You are about to drop the column `expectedEnd` on the `Budget` table. All the data in the column will be lost.
  - You are about to drop the column `predicted_value` on the `Budget` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Budget` table. All the data in the column will be lost.
  - Added the required column `allocatedStage` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cost` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `extraHours` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `function` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hours` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stockQuantity` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitMeasure` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Budget` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Budget" (
    "id_budget" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "unitMeasure" TEXT NOT NULL,
    "cost" REAL NOT NULL,
    "stockQuantity" INTEGER NOT NULL,
    "hours" REAL NOT NULL,
    "extraHours" REAL NOT NULL,
    "total" REAL NOT NULL,
    "allocatedStage" TEXT NOT NULL,
    "function" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Budget_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Budget" ("category", "createdAt", "id_budget", "name", "updatedAt") SELECT "category", "createdAt", "id_budget", "name", "updatedAt" FROM "Budget";
DROP TABLE "Budget";
ALTER TABLE "new_Budget" RENAME TO "Budget";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
