-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FinancialSchedule" (
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
INSERT INTO "new_FinancialSchedule" ("id_financialSchedule", "id_physicalSchedule", "id_stage", "id_work", "percentage", "period", "value") SELECT "id_financialSchedule", "id_physicalSchedule", "id_stage", "id_work", "percentage", "period", "value" FROM "FinancialSchedule";
DROP TABLE "FinancialSchedule";
ALTER TABLE "new_FinancialSchedule" RENAME TO "FinancialSchedule";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
