/*
  Warnings:

  - You are about to drop the column `hours` on the `Budget` table. All the data in the column will be lost.
  - Added the required column `costHours` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hoursWorked` to the `Budget` table without a default value. This is not possible if the table is not empty.

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
    "hoursWorked" INTEGER NOT NULL,
    "costHours" REAL NOT NULL,
    "extraHours" REAL NOT NULL,
    "total" REAL NOT NULL,
    "allocatedStage" TEXT NOT NULL,
    "function" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Budget_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Budget" ("allocatedStage", "category", "code", "cost", "createdAt", "extraHours", "function", "id_budget", "name", "stockQuantity", "total", "type", "unitMeasure", "updatedAt", "user_id") SELECT "allocatedStage", "category", "code", "cost", "createdAt", "extraHours", "function", "id_budget", "name", "stockQuantity", "total", "type", "unitMeasure", "updatedAt", "user_id" FROM "Budget";
DROP TABLE "Budget";
ALTER TABLE "new_Budget" RENAME TO "Budget";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
