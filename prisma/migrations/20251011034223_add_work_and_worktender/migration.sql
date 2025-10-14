-- CreateTable
CREATE TABLE "Work" (
    "id_work" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_enterprise" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "budget" REAL NOT NULL,
    "start_time" DATETIME NOT NULL,
    "end_time" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "photo_url" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Work_id_enterprise_fkey" FOREIGN KEY ("id_enterprise") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WorkTender" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_work" INTEGER NOT NULL,
    "id_tender" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WorkTender_id_work_fkey" FOREIGN KEY ("id_work") REFERENCES "Work" ("id_work") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "WorkTender_id_tender_fkey" FOREIGN KEY ("id_tender") REFERENCES "Tender" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
