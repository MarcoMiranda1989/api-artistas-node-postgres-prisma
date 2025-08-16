import type { Artist } from "./artists.interface.js";
import type { Song } from "./songs.interface.js";
export interface Album {
    id: number;
    titulo: string;
    anio: number;
    genero?: string;
    artistaId: number;
    artista?: Artist;
    canciones?: Song[];
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=albums.interface.d.ts.map