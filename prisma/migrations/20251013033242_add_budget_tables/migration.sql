-- CreateTable
CREATE TABLE "Budget" (
    "id_budget" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "predicted_value" REAL NOT NULL,
    "executed_value" REAL NOT NULL,
    "expectedEnd" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "BudgetManagerWork" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_manager" INTEGER NOT NULL,
    "id_work" INTEGER NOT NULL,
    "id_budget" INTEGER NOT NULL,
    "actionType" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "BudgetManagerWork_id_budget_fkey" FOREIGN KEY ("id_budget") REFERENCES "Budget" ("id_budget") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BudgetManagerWork_id_work_fkey" FOREIGN KEY ("id_work") REFERENCES "Work" ("id_work") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BudgetManagerWork_id_manager_fkey" FOREIGN KEY ("id_manager") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
