import type { Album } from "./albums.interface.js";
export interface Song {
    id: number;
    titulo: string;
    duracion: number;
    albumId: number;
    album?: Album;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=songs.interface.d.ts.map