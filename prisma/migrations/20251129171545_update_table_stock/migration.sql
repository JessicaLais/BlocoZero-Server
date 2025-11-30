/*
  Warnings:

  - You are about to drop the column `allocatedStage` on the `Budget` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Budget" (
    "id_budget" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_work" INTEGER NOT NULL,
    "id_category" INTEGER NOT NULL,
    "id_type" INTEGER NOT NULL,
    "id_stage" INTEGER,
    "id_substage" INTEGER,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unitMeasure" TEXT NOT NULL,
    "cost" REAL NOT NULL,
    "quantityUsage" INTEGER NOT NULL,
    "hours" REAL NOT NULL,
    "extraHours" REAL NOT NULL,
    "total" REAL NOT NULL,
    "Userfunction" TEXT NOT NULL,
    "weightLength" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Budget_id_work_fkey" FOREIGN KEY ("id_work") REFERENCES "Work" ("id_work") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Budget_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "Category" ("id_category") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Budget_id_type_fkey" FOREIGN KEY ("id_type") REFERENCES "Type" ("id_type") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Budget_id_stage_fkey" FOREIGN KEY ("id_stage") REFERENCES "Stage" ("id_stage") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Budget_id_substage_fkey" FOREIGN KEY ("id_substage") REFERENCES "Substage" ("id_substage") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Budget" ("Userfunction", "code", "cost", "createdAt", "extraHours", "hours", "id_budget", "id_category", "id_stage", "id_substage", "id_type", "id_work", "name", "quantityUsage", "total", "unitMeasure", "updatedAt", "weightLength") SELECT "Userfunction", "code", "cost", "createdAt", "extraHours", "hours", "id_budget", "id_category", "id_stage", "id_substage", "id_type", "id_work", "name", "quantityUsage", "total", "unitMeasure", "updatedAt", "weightLength" FROM "Budget";
DROP TABLE "Budget";
ALTER TABLE "new_Budget" RENAME TO "Budget";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
