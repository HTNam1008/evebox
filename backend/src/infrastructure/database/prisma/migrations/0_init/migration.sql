-- CreateEnum
CREATE TYPE "users_role_enum" AS ENUM ('SYSTEM_ADMIN', 'ADMIN', 'ORGANIZER', 'CUSTOMER');

-- CreateTable
CREATE TABLE "users" (
    "id" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "role" "users_role_enum" NOT NULL,

    CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UQ_97672ac88f789774dd47f7c8be3" ON "users"("email");

