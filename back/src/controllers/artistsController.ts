import type { Request, Response } from "express";
import prisma from "../models/prisma.js"; // <-- import del cliente completo


export const createArtist = async (req: Request, res: Response): Promise<Response | void> => {
    console.log("POST /artists body:", req.body); // <--- NUEVO
    try {
        const { nombre, pais, image } = req.body; // <-- agregamos imagen
        if (!nombre) return res.status(400).json({ error: "El nombre es obligatorio" });
        if (!pais) return res.status(400).json({ error: "El pais es obligatorio" });

        const artist = await prisma.artista.create({
            data: { 
                nombre, 
                pais, 
                image // <-- agregamos aquí
            }
        });
        console.log("Artista creado:", artist);
        return res.status(201).json(artist);
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ error: "Hubo un error al crear el artista" });
    }
}


export const getAllArtists = async (req:Request, res: Response): Promise<void> => {
    try {
        const artists= await prisma.artista.findMany({
            include: {
                albums: {
                    include: {
                        canciones: true
                    }
                }
            }
        })
        res.status(200).json(artists)
    } catch (error:any) {
        console.log(error);
        res.status(500).json({ error: "Hubo un error" });
    }
}

export const getArtistById = async (req:Request, res: Response): Promise<void> => {
    const artistId = Number(req.params.id);
    try {
        const artist = await prisma.artista.findUnique({
            where:{ id: artistId },
            include:{
                albums: {
                    include: {
                        canciones: true
                    }
                }
            }
        })

        if (!artist) {
            res.status(404).json({ error: "el artista no fue encontrado" });
            return;
        }
        res.status(200).json(artist);
    } catch (error:any) {
        console.log(error);
        res.status(500).json({ error: "Hubo un error" });
    }
}

export const updateArtist = async (req:Request, res: Response): Promise<void> => {
    const artistId = Number(req.params.id);
    const {nombre, pais, albums, createdAt, updatedAt} = req.body
    try {
        let artistData:any = {...req.body}
        if (nombre) artistData.nombre = nombre
        if (pais) artistData.pais = pais
        if (albums) artistData.albums = albums

        const artist = await prisma.artista.update({
            where:{ id: artistId },
            data: artistData
        })
        res.status(200).json(artist);
    } catch (error:any) {
        if (error?.code === "P2002" && error?.meta?.target?.includes("nombre")) {
            res.status(400).json({ error: "El artista ingresado ya existe" });
        } else if (error?.code === "P2025") {
            res.status(400).json({ error: "artista no encontrado" });
        } else {
            console.log(error);
            res.status(500).json({ error: "Hubo un error, prueba mas tarde" });
        }
    }
}

export const deleteArtist = async (req:Request, res: Response): Promise<void> => {
    const artistId = Number(req.params.id);
    try {
        await prisma.artista.delete({
            where: { id: artistId },
        });

        res.status(200).json({ message: `El artista ${artistId} ha sido eliminado con exito` }).end();
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: "Hubo un error, prueba mas tarde" });
    }
}
