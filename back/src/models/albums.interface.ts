import type{ Artist } from "./artists.interface.js";
import type { Song } from "./songs.interface.js";

export interface Album {
  id: number;
  titulo: string;
  anio: number;
  image:string;
  genero?: string;
  artistaId: number;
  artista?: Artist; // Opcional, si quieres incluir el artista relacionado
  canciones?: Song[]; // Opcional, si quieres incluir las canciones
  createdAt: Date;
  updatedAt: Date;
}