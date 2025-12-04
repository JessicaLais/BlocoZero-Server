-- CreateTable
CREATE TABLE "ProgressSubstageReport" (
    "id_progressSubstageReport" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_work" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_stage" INTEGER NOT NULL,
    "id_substage" INTEGER NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "weather" TEXT NOT NULL,
    "completionPercentage" REAL NOT NULL,
    "photo" BLOB,
    "notes" TEXT,
    "status" TEXT NOT NULL,
    "managerRejectionReason" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ProgressSubstageReport_id_work_fkey" FOREIGN KEY ("id_work") REFERENCES "Work" ("id_work") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProgressSubstageReport_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User" ("id_user") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProgressSubstageReport_id_stage_fkey" FOREIGN KEY ("id_stage") REFERENCES "Stage" ("id_stage") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProgressSubstageReport_id_substage_fkey" FOREIGN KEY ("id_substage") REFERENCES "Substage" ("id_substage") ON DELETE RESTRICT ON UPDATE CASCADE
);
