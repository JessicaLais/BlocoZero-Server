/*
  Warnings:

  - You are about to drop the `Budget` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BudgetManagerWork` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Manager` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ManagerTender` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Substage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tender` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkTender` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `Enterprise` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Enterprise` table. All the data in the column will be lost.
  - The primary key for the `Stage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `endDate` on the `Stage` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Stage` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Stage` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Stage` table. All the data in the column will be lost.
  - You are about to drop the column `work_id` on the `Stage` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Work` table. All the data in the column will be lost.
  - You are about to drop the column `id_enterprise` on the `Work` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Work` table. All the data in the column will be lost.
  - Added the required column `id_entreprise` to the `Enterprise` table without a default value. This is not possible if the table is not empty.
  - Made the column `address` on table `Enterprise` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cnpj` on table `Enterprise` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Enterprise` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `Enterprise` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `expEndDate` to the `Stage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expStartDate` to the `Stage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_stage` to the `Stage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `substage` to the `Stage` table without a default value. This is not possible if the table is not empty.
  - Made the column `progress` on table `Stage` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `id_user` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `works` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `describe` to the `Work` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_entreprise` to the `Work` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_manager` to the `Work` table without a default value. This is not possible if the table is not empty.
  - Made the column `photo_url` on table `Work` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Manager_user_id_key";

-- DropIndex
DROP INDEX "Tender_user_id_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Budget";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "BudgetManagerWork";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Manager";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ManagerTender";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Substage";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Tender";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "WorkTender";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Resource" (
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
    "function" TEXT NOT NULL,
    "weightLength" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Resource_id_work_fkey" FOREIGN KEY ("id_work") REFERENCES "Work" ("id_work") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Resource_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "Category" ("id_category") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Resource_id_type_fkey" FOREIGN KEY ("id_type") REFERENCES "Type" ("id_type") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PhysicalSchedule" (
    "id_physicalSchedule" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_work" INTEGER NOT NULL,
    "id_stage" INTEGER NOT NULL,
    CONSTRAINT "PhysicalSchedule_id_work_fkey" FOREIGN KEY ("id_work") REFERENCES "Work" ("id_work") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PhysicalSchedule_id_stage_fkey" FOREIGN KEY ("id_stage") REFERENCES "Stage" ("id_stage") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FinancialSchedule" (
    "id_financialSchedule" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_work" INTEGER NOT NULL,
    "id_stage" INTEGER NOT NULL,
    "id_physicalSchedule" INTEGER NOT NULL,
    "period" DATETIME NOT NULL,
    "percentage" REAL NOT NULL,
    "value" REAL NOT NULL,
    CONSTRAINT "FinancialSchedule_id_work_fkey" FOREIGN KEY ("id_work") REFERENCES "Work" ("id_work") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FinancialSchedule_id_stage_fkey" FOREIGN KEY ("id_stage") REFERENCES "Stage" ("id_stage") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FinancialSchedule_id_physicalSchedule_fkey" FOREIGN KEY ("id_physicalSchedule") REFERENCES "PhysicalSchedule" ("id_physicalSchedule") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EquipmentRequest" (
    "id_equipment" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_type" INTEGER NOT NULL,
    "id_category" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    CONSTRAINT "EquipmentRequest_id_type_fkey" FOREIGN KEY ("id_type") REFERENCES "Type" ("id_type") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EquipmentRequest_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "Category" ("id_category") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Type" (
    "id_type" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ProgressReport" (
    "id_progressReport" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_work" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_stage" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "reportVersion" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "substage" TEXT NOT NULL,
    "weather" TEXT NOT NULL,
    "startDate" DATETIME,
    "endDate" DATETIME,
    "note" TEXT NOT NULL,
    CONSTRAINT "ProgressReport_id_work_fkey" FOREIGN KEY ("id_work") REFERENCES "Work" ("id_work") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProgressReport_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User" ("id_user") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProgressReport_id_stage_fkey" FOREIGN KEY ("id_stage") REFERENCES "Stage" ("id_stage") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BudgetReport" (
    "id_budgetReport" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_type" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_stage" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "referencePeriod" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "overallPercentage" REAL NOT NULL,
    "availableBalance" REAL NOT NULL,
    "plannedValue" REAL NOT NULL,
    "executedValue" REAL NOT NULL,
    "financialDeviation" REAL NOT NULL,
    CONSTRAINT "BudgetReport_id_type_fkey" FOREIGN KEY ("id_type") REFERENCES "Type" ("id_type") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BudgetReport_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User" ("id_user") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BudgetReport_id_stage_fkey" FOREIGN KEY ("id_stage") REFERENCES "Stage" ("id_stage") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Stock" (
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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "recentInflow" INTEGER NOT NULL,
    "cumulativeInflow" INTEGER NOT NULL,
    "cumulativeOutflow" INTEGER NOT NULL,
    "recentOutflow" INTEGER NOT NULL,
    "actualQuantity" INTEGER NOT NULL,
    "minQuantity" INTEGER NOT NULL,
    CONSTRAINT "Stock_id_budget_fkey" FOREIGN KEY ("id_budget") REFERENCES "Resource" ("id_budget") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Stock_id_type_fkey" FOREIGN KEY ("id_type") REFERENCES "Type" ("id_type") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Stock_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "Category" ("id_category") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MaterialUsage" (
    "id_materialUsage" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_stock" INTEGER NOT NULL,
    "employee_name" TEXT NOT NULL,
    "material_name" TEXT NOT NULL,
    "useDate" DATETIME NOT NULL,
    "code" INTEGER NOT NULL,
    "defect" TEXT NOT NULL,
    CONSTRAINT "MaterialUsage_id_stock_fkey" FOREIGN KEY ("id_stock") REFERENCES "Stock" ("id_stock") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Category" (
    "id_category" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Enterprise" (
    "id_entreprise" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Enterprise" ("address", "cnpj", "createdAt", "email", "name", "phone", "updatedAt") SELECT "address", "cnpj", "createdAt", "email", "name", "phone", "updatedAt" FROM "Enterprise";
DROP TABLE "Enterprise";
ALTER TABLE "new_Enterprise" RENAME TO "Enterprise";
CREATE TABLE "new_Stage" (
    "id_stage" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "substage" TEXT NOT NULL,
    "progress" REAL NOT NULL,
    "expStartDate" DATETIME NOT NULL,
    "expEndDate" DATETIME NOT NULL,
    "exeStartDate" DATETIME,
    "exeEndDate" DATETIME,
    "mainStageId" INTEGER,
    CONSTRAINT "Stage_mainStageId_fkey" FOREIGN KEY ("mainStageId") REFERENCES "Stage" ("id_stage") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Stage" ("name", "progress") SELECT "name", "progress" FROM "Stage";
DROP TABLE "Stage";
ALTER TABLE "new_Stage" RENAME TO "Stage";
CREATE TABLE "new_User" (
    "id_user" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "enterprise_id" INTEGER NOT NULL,
    "userFunction" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "works" TEXT NOT NULL,
    "hourlyRate" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "User_enterprise_id_fkey" FOREIGN KEY ("enterprise_id") REFERENCES "Enterprise" ("id_entreprise") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("createdAt", "email", "enterprise_id", "hourlyRate", "name", "password", "phone", "updatedAt", "userFunction") SELECT "createdAt", "email", "enterprise_id", "hourlyRate", "name", "password", "phone", "updatedAt", "userFunction" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE TABLE "new_Work" (
    "id_work" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_entreprise" INTEGER NOT NULL,
    "id_manager" INTEGER NOT NULL,
    "id_tender" INTEGER,
    "title" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "budget" REAL NOT NULL,
    "start_time" DATETIME NOT NULL,
    "end_time" DATETIME NOT NULL,
    "describe" TEXT NOT NULL,
    "photo_url" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Work_id_entreprise_fkey" FOREIGN KEY ("id_entreprise") REFERENCES "Enterprise" ("id_entreprise") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Work" ("address", "budget", "cep", "cnpj", "createdAt", "end_time", "id_work", "photo_url", "start_time", "title", "updatedAt") SELECT "address", "budget", "cep", "cnpj", "createdAt", "end_time", "id_work", "photo_url", "start_time", "title", "updatedAt" FROM "Work";
DROP TABLE "Work";
ALTER TABLE "new_Work" RENAME TO "Work";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
