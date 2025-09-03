-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "enterprise_id" INTEGER NOT NULL,
    "work_id" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit" TEXT,
    "lote" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Item_enterprise_id_fkey" FOREIGN KEY ("enterprise_id") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Item_work_id_fkey" FOREIGN KEY ("work_id") REFERENCES "Work" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Usage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "item_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "work_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "usedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "purpose" TEXT NOT NULL,
    "lote" TEXT,
    CONSTRAINT "Usage_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Usage_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Usage_work_id_fkey" FOREIGN KEY ("work_id") REFERENCES "Work" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Item_code_key" ON "Item"("code");
