import type { Album } from "./albums.interface.js";

export interface Artist {
  id: number;
  nombre: string;
  pais?: string;
  image:string;
  albums?: Album[]; // Opcional, si quieres incluir los álbumes relacionados
  createdAt: Date;
  updatedAt: Date;
}