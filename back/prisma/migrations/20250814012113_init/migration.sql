/*
  Warnings:

  - You are about to drop the column `artista` on the `Album` table. All the data in the column will be lost.
  - Added the required column `artistaId` to the `Album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Album` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Album" DROP COLUMN "artista",
ADD COLUMN     "artistaId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "genero" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "public"."Artista" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "pais" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Artista_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Cancion" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "duracion" INTEGER NOT NULL,
    "albumId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cancion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Album" ADD CONSTRAINT "Album_artistaId_fkey" FOREIGN KEY ("artistaId") REFERENCES "public"."Artista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Cancion" ADD CONSTRAINT "Cancion_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "public"."Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
