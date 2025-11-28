-- CreateTable
CREATE TABLE "Enterprise" (
    "id_entreprise" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
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

-- CreateTable
CREATE TABLE "Work" (
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
    "photo" BLOB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    CONSTRAINT "Work_id_entreprise_fkey" FOREIGN KEY ("id_entreprise") REFERENCES "Enterprise" ("id_entreprise") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Stage" (
    "id_stage" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "progress" REAL NOT NULL,
    "expStartDate" DATETIME NOT NULL,
    "expEndDate" DATETIME NOT NULL,
    "exeStartDate" DATETIME,
    "exeEndDate" DATETIME
);

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
    "id_substage" INTEGER,
    "period" DATETIME NOT NULL,
    "percentage" REAL NOT NULL,
    "value" REAL NOT NULL,
    CONSTRAINT "FinancialSchedule_id_work_fkey" FOREIGN KEY ("id_work") REFERENCES "Work" ("id_work") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FinancialSchedule_id_stage_fkey" FOREIGN KEY ("id_stage") REFERENCES "Stage" ("id_stage") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FinancialSchedule_id_physicalSchedule_fkey" FOREIGN KEY ("id_physicalSchedule") REFERENCES "PhysicalSchedule" ("id_physicalSchedule") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FinancialSchedule_id_substage_fkey" FOREIGN KEY ("id_substage") REFERENCES "Substage" ("id_substage") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EquipmentRequest" (
    "id_equipmentRequest" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
    "name" TEXT NOT NULL,
    "work_id" INTEGER NOT NULL,
    CONSTRAINT "Type_work_id_fkey" FOREIGN KEY ("work_id") REFERENCES "Work" ("id_work") ON DELETE RESTRICT ON UPDATE CASCADE
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
    "id_type" INTEGER NOT NULL,
    "id_category" INTEGER NOT NULL,
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
    "id_type" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "Category_id_type_fkey" FOREIGN KEY ("id_type") REFERENCES "Type" ("id_type") ON DELETE RESTRICT ON UPDATE CASCADE
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

-- CreateTable
CREATE TABLE "substage_category_type" (
    "id_substage" INTEGER NOT NULL,
    "id_category" INTEGER NOT NULL,
    "id_type" INTEGER NOT NULL,

    PRIMARY KEY ("id_substage", "id_category", "id_type"),
    CONSTRAINT "substage_category_type_id_substage_fkey" FOREIGN KEY ("id_substage") REFERENCES "Substage" ("id_substage") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "substage_category_type_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "Category" ("id_category") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "substage_category_type_id_type_fkey" FOREIGN KEY ("id_type") REFERENCES "Type" ("id_type") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Enterprise_cnpj_key" ON "Enterprise"("cnpj");
