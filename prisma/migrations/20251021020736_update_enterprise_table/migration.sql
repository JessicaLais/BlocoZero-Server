/*
  Warnings:

  - A unique constraint covering the columns `[cnpj]` on the table `Enterprise` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Enterprise_cnpj_key" ON "Enterprise"("cnpj");
