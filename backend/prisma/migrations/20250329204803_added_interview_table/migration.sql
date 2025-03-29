-- CreateTable
CREATE TABLE "Interview" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "techstack" TEXT[],
    "questions" TEXT[],
    "userid" TEXT NOT NULL,
    "finalized" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
