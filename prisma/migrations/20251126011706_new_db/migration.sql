/*
  Warnings:

  - You are about to drop the `Resource` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `EquipmentRequest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_equipment` on the `EquipmentRequest` table. All the data in the column will be lost.
  - Added the required column `id_equipmentRequest` to the `EquipmentRequest` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Resource";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Budget" (
    "id_budget" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_work" INTEGER NOT NULL,
    "id_category" INTEGER NOT NULL,
    "id_type" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unitMeasure" TEXT NOT NULL,
    "cost" REAL NOT NULL,
    "stockQuantity" INTEGER NOT NULL,
    "hours" REAL NOT NULL,
    "extraHours" REAL NOT NULL,
    "total" REAL NOT NULL,
    "allocatedStage" TEXT NOT NULL,
    "Userfunction" TEXT NOT NULL,
    "weightLength" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Budget_id_work_fkey" FOREIGN KEY ("id_work") REFERENCES "Work" ("id_work") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Budget_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "Category" ("id_category") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Budget_id_type_fkey" FOREIGN KEY ("id_type") REFERENCES "Type" ("id_type") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EquipmentRequest" (
    "id_equipmentRequest" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_type" INTEGER NOT NULL,
    "id_category" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    CONSTRAINT "EquipmentRequest_id_type_fkey" FOREIGN KEY ("id_type") REFERENCES "Type" ("id_type") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EquipmentRequest_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "Category" ("id_category") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_EquipmentRequest" ("id_category", "id_type", "name", "quantity") SELECT "id_category", "id_type", "name", "quantity" FROM "EquipmentRequest";
DROP TABLE "EquipmentRequest";
ALTER TABLE "new_EquipmentRequest" RENAME TO "EquipmentRequest";
CREATE TABLE "new_Stock" (
    "id_stock" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_budget" INTEGER NOT NULL,
    "id_type" INTEGER NOT NULL,
    "id_category" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unitMeasure" TEXT NOT NULL,
    "stockQuantity" INTEGER NOT NULL,
    "allocatedStage" TEXT NOT NULL,
    "weightLength" REAL NOT NULL,
    "recentInflow" INTEGER NOT NULL,
    "cumulativeInflow" INTEGER NOT NULL,
    "cumulativeOutflow" INTEGER NOT NULL,
    "recentOutflow" INTEGER NOT NULL,
    "actualQuantity" INTEGER NOT NULL,
    "minQuantity" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Stock_id_budget_fkey" FOREIGN KEY ("id_budget") REFERENCES "Budget" ("id_budget") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Stock_id_type_fkey" FOREIGN KEY ("id_type") REFERENCES "Type" ("id_type") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Stock_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "Category" ("id_category") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Stock" ("actualQuantity", "allocatedStage", "code", "createdAt", "cumulativeInflow", "cumulativeOutflow", "id_budget", "id_category", "id_stock", "id_type", "minQuantity", "name", "recentInflow", "recentOutflow", "stockQuantity", "unitMeasure", "updatedAt", "weightLength") SELECT "actualQuantity", "allocatedStage", "code", "createdAt", "cumulativeInflow", "cumulativeOutflow", "id_budget", "id_category", "id_stock", "id_type", "minQuantity", "name", "recentInflow", "recentOutflow", "stockQuantity", "unitMeasure", "updatedAt", "weightLength" FROM "Stock";
DROP TABLE "Stock";
ALTER TABLE "new_Stock" RENAME TO "Stock";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
