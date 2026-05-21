-- DropForeignKey
ALTER TABLE "public"."Cancion" DROP CONSTRAINT "Cancion_albumId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Cancion" ADD CONSTRAINT "Cancion_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "public"."Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;
