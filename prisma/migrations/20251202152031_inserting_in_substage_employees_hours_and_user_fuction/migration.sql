-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_substage_employes" (
    "id_substage" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,
    "hours" REAL NOT NULL DEFAULT 0,
    "userFunction" TEXT NOT NULL DEFAULT 'none',
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id_substage", "id_user"),
    CONSTRAINT "substage_employes_id_substage_fkey" FOREIGN KEY ("id_substage") REFERENCES "Substage" ("id_substage") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "substage_employes_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User" ("id_user") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_substage_employes" ("assignedAt", "id_substage", "id_user") SELECT "assignedAt", "id_substage", "id_user" FROM "substage_employes";
DROP TABLE "substage_employes";
ALTER TABLE "new_substage_employes" RENAME TO "substage_employes";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
