/*
  Warnings:

  - Added the required column `id_work` to the `Stock` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Stock" (
    "id_stock" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_type" INTEGER NOT NULL,
    "id_category" INTEGER NOT NULL,
    "id_work" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unitMeasure" TEXT NOT NULL,
    "stockQuantity" INTEGER NOT NULL,
    "weightLength" REAL NOT NULL,
    "recentInflow" INTEGER NOT NULL,
    "cumulativeInflow" INTEGER NOT NULL,
    "cumulativeOutflow" INTEGER NOT NULL,
    "recentOutflow" INTEGER NOT NULL,
    "actualQuantity" INTEGER NOT NULL,
    "minQuantity" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Stock_id_type_fkey" FOREIGN KEY ("id_type") REFERENCES "Type" ("id_type") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Stock_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "Category" ("id_category") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Stock_id_work_fkey" FOREIGN KEY ("id_work") REFERENCES "Work" ("id_work") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Stock" ("actualQuantity", "code", "createdAt", "cumulativeInflow", "cumulativeOutflow", "id_category", "id_stock", "id_type", "minQuantity", "name", "recentInflow", "recentOutflow", "stockQuantity", "unitMeasure", "updatedAt", "weightLength") SELECT "actualQuantity", "code", "createdAt", "cumulativeInflow", "cumulativeOutflow", "id_category", "id_stock", "id_type", "minQuantity", "name", "recentInflow", "recentOutflow", "stockQuantity", "unitMeasure", "updatedAt", "weightLength" FROM "Stock";
DROP TABLE "Stock";
ALTER TABLE "new_Stock" RENAME TO "Stock";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
