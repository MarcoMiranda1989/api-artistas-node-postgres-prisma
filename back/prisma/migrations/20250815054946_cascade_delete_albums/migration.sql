-- DropForeignKey
ALTER TABLE "public"."Album" DROP CONSTRAINT "Album_artistaId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Album" ADD CONSTRAINT "Album_artistaId_fkey" FOREIGN KEY ("artistaId") REFERENCES "public"."Artista"("id") ON DELETE CASCADE ON UPDATE CASCADE;
