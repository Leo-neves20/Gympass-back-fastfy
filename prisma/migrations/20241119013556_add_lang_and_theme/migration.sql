-- CreateEnum
CREATE TYPE "ThemeType" AS ENUM ('LIGHT', 'DARK', 'AUTO');

-- CreateEnum
CREATE TYPE "LangType" AS ENUM ('PT_BR', 'EN_US');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "lang" "LangType" NOT NULL DEFAULT 'EN_US',
ADD COLUMN     "theme" "ThemeType" NOT NULL DEFAULT 'AUTO';
