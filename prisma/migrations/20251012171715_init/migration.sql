-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Work" (
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
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Work_id_enterprise_fkey" FOREIGN KEY ("id_enterprise") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Work" ("address", "budget", "cep", "cnpj", "createdAt", "description", "end_time", "id_enterprise", "id_work", "photo_url", "start_time", "title", "updatedAt") SELECT "address", "budget", "cep", "cnpj", "createdAt", "description", "end_time", "id_enterprise", "id_work", "photo_url", "start_time", "title", "updatedAt" FROM "Work";
DROP TABLE "Work";
ALTER TABLE "new_Work" RENAME TO "Work";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
