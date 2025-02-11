-- CreateTable
CREATE TABLE "Resume" (
    "id" TEXT NOT NULL,
    "resumeTitle" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Resume_id_key" ON "Resume"("id");

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
