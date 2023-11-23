-- CreateEnum
CREATE TYPE "ToDoStatus" AS ENUM ('DONE', 'UNDONE');

-- CreateTable
CREATE TABLE "ToDo" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "status" "ToDoStatus" NOT NULL DEFAULT 'UNDONE',

    CONSTRAINT "ToDo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ToDo_title_key" ON "ToDo"("title");
