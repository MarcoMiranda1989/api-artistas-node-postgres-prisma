import type { Album } from "./albums.interface.js";
export interface Artist {
    id: number;
    nombre: string;
    pais?: string;
    image: string;
    albums?: Album[];
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=artists.interface.d.ts.map