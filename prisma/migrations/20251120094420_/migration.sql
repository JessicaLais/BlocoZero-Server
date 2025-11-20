/*
  Warnings:

  - You are about to drop the column `substage` on the `ProgressReport` table. All the data in the column will be lost.
  - You are about to drop the column `function` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the column `id_work` on the `Stage` table. All the data in the column will be lost.
  - You are about to drop the column `substage` on the `Stage` table. All the data in the column will be lost.
  - Added the required column `Userfunction` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Substage" (
    "id_substage" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "expDuration" REAL NOT NULL,
    "progress" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "work_stage" (
    "id_work" INTEGER NOT NULL,
    "id_stage" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    PRIMARY KEY ("id_work", "id_stage"),
    CONSTRAINT "work_stage_id_work_fkey" FOREIGN KEY ("id_work") REFERENCES "Work" ("id_work") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "work_stage_id_stage_fkey" FOREIGN KEY ("id_stage") REFERENCES "Stage" ("id_stage") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "stage_substage" (
    "id_stage" INTEGER NOT NULL,
    "id_substage" INTEGER NOT NULL,

    PRIMARY KEY ("id_stage", "id_substage"),
    CONSTRAINT "stage_substage_id_stage_fkey" FOREIGN KEY ("id_stage") REFERENCES "Stage" ("id_stage") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "stage_substage_id_substage_fkey" FOREIGN KEY ("id_substage") REFERENCES "Substage" ("id_substage") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "substage_employes" (
    "id_substage" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id_substage", "id_user"),
    CONSTRAINT "substage_employes_id_substage_fkey" FOREIGN KEY ("id_substage") REFERENCES "Substage" ("id_substage") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "substage_employes_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User" ("id_user") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "substage_stock" (
    "id_substage" INTEGER NOT NULL,
    "id_stock" INTEGER NOT NULL,
    "quantityUsed" REAL NOT NULL,

    PRIMARY KEY ("id_substage", "id_stock"),
    CONSTRAINT "substage_stock_id_substage_fkey" FOREIGN KEY ("id_substage") REFERENCES "Substage" ("id_substage") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "substage_stock_id_stock_fkey" FOREIGN KEY ("id_stock") REFERENCES "Stock" ("id_stock") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "substage_schedule" (
    "id_substageSchedule" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_substage" INTEGER NOT NULL,
    "id_physicalSchedule" INTEGER NOT NULL,
    "expDuration" REAL NOT NULL,
    "expStartDate" DATETIME NOT NULL,
    "expEndDate" DATETIME NOT NULL,
    "exeStartDate" DATETIME,
    "exeEndDate" DATETIME,
    "progress" REAL NOT NULL DEFAULT 0.0,
    CONSTRAINT "substage_schedule_id_substage_fkey" FOREIGN KEY ("id_substage") REFERENCES "Substage" ("id_substage") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "substage_schedule_id_physicalSchedule_fkey" FOREIGN KEY ("id_physicalSchedule") REFERENCES "PhysicalSchedule" ("id_physicalSchedule") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProgressReport" (
    "id_progressReport" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_work" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_stage" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "reportVersion" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "weather" TEXT NOT NULL,
    "startDate" DATETIME,
    "endDate" DATETIME,
    "note" TEXT NOT NULL,
    CONSTRAINT "ProgressReport_id_work_fkey" FOREIGN KEY ("id_work") REFERENCES "Work" ("id_work") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProgressReport_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User" ("id_user") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProgressReport_id_stage_fkey" FOREIGN KEY ("id_stage") REFERENCES "Stage" ("id_stage") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProgressReport" ("createdAt", "endDate", "id_progressReport", "id_stage", "id_user", "id_work", "note", "reportVersion", "startDate", "title", "weather") SELECT "createdAt", "endDate", "id_progressReport", "id_stage", "id_user", "id_work", "note", "reportVersion", "startDate", "title", "weather" FROM "ProgressReport";
DROP TABLE "ProgressReport";
ALTER TABLE "new_ProgressReport" RENAME TO "ProgressReport";
CREATE TABLE "new_Resource" (
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
    CONSTRAINT "Resource_id_work_fkey" FOREIGN KEY ("id_work") REFERENCES "Work" ("id_work") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Resource_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "Category" ("id_category") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Resource_id_type_fkey" FOREIGN KEY ("id_type") REFERENCES "Type" ("id_type") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Resource" ("allocatedStage", "code", "cost", "createdAt", "extraHours", "hours", "id_budget", "id_category", "id_type", "id_work", "name", "stockQuantity", "total", "unitMeasure", "updatedAt", "weightLength") SELECT "allocatedStage", "code", "cost", "createdAt", "extraHours", "hours", "id_budget", "id_category", "id_type", "id_work", "name", "stockQuantity", "total", "unitMeasure", "updatedAt", "weightLength" FROM "Resource";
DROP TABLE "Resource";
ALTER TABLE "new_Resource" RENAME TO "Resource";
CREATE TABLE "new_Stage" (
    "id_stage" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "progress" REAL NOT NULL,
    "expStartDate" DATETIME NOT NULL,
    "expEndDate" DATETIME NOT NULL,
    "exeStartDate" DATETIME,
    "exeEndDate" DATETIME
);
INSERT INTO "new_Stage" ("exeEndDate", "exeStartDate", "expEndDate", "expStartDate", "id_stage", "name", "progress") SELECT "exeEndDate", "exeStartDate", "expEndDate", "expStartDate", "id_stage", "name", "progress" FROM "Stage";
DROP TABLE "Stage";
ALTER TABLE "new_Stage" RENAME TO "Stage";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
