-- CreateTable
CREATE TABLE "DefectReport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "itemId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "workId" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "note" TEXT NOT NULL,
    "reportedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" DATETIME,
    CONSTRAINT "DefectReport_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DefectReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DefectReport_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
