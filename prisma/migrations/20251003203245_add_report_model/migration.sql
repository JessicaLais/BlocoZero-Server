-- CreateTable
CREATE TABLE "Report" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "percentual" REAL NOT NULL,
    "qtd_work" REAL NOT NULL,
    "weather" TEXT NOT NULL,
    "ocurrence" TEXT NOT NULL,
    "stage" TEXT NOT NULL,
    "date_register" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendente'
);
