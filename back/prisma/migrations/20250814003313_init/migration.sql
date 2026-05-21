-- CreateTable
CREATE TABLE "public"."Album" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "artista" TEXT NOT NULL,
    "anio" INTEGER NOT NULL,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);
