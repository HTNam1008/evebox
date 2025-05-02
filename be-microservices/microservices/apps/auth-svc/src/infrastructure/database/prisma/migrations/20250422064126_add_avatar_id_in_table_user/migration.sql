-- DropIndex
DROP INDEX "images_userEmail_idx";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatar_id" INTEGER;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_avatar_id_fkey" FOREIGN KEY ("avatar_id") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;
