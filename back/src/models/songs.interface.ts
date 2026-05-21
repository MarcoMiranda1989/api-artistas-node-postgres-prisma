import type { Album } from "./albums.interface.js";

export interface Song {
  id: number;
  titulo: string;
  duracion: number;
  albumId: number;
  album?: Album; // Opcional, si quieres incluir el álbum relacionado
  createdAt: Date;
  updatedAt: Date;
}