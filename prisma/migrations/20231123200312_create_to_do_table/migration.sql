-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('DONE', 'UNDONE');

-- CreateTable
CREATE TABLE "Task" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'UNDONE',

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Task_title_key" ON "Task"("title");
