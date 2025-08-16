import type { Request, Response } from "express";
import prisma from "../models/albums.js"

export const createAlbum = async (req:Request, res: Response): Promise<void> => {
    try {
        const { titulo, anio, genero, artistaId, artista, canciones,createdAt, updatedAt} = req.body

        if (!titulo) {
            res.status(400).json({ error: "El titulo es obligatorio" });
            return;
        }
        if (!anio) {
            res.status(400).json({ error: "El año es obligatorio" });
            return;
        }
        if (!genero) {
            res.status(400).json({ error: "El genero es obligatorio" });
            return;
        }
        if (!artistaId) {
            res.status(400).json({ error: "El ID del artista es obligatorio" });
            return;
        }
       


        //checando todos los errores podemos continuar a crear el album

        const album = await prisma.create({
            data:{
                titulo,
                anio,
                genero,
                artistaId,
                createdAt,
                updatedAt
            },
        })
        res.status(201).json({ album });
    } catch (error:any) {
        {
        if (error?.code === "P2002" && error?.meta?.target?.includes("artistaId")) {
      res.status(400).json({ message: "el artista ingresado ya existe" });
    }
    console.log(error);
    res.status(500).json({ error: "Hubo un error" });
    }
        
    }
}

export const getAllAlbums = async (req:Request, res: Response): Promise<void> => {
try {
    const albums= await prisma.findMany({
            include: {
                canciones: true
                 }
            
    })
    res.status(200).json(albums)
} catch (error:any) {
    console.log(error);
    res.status(500).json({ error: "Hubo un error" });
}
}

export const getAlbumById = async (req:Request, res: Response): Promise<void> => {
    const albumId = Number(req.params.id);
    try {
        const album = await prisma.findUnique({
            where:{
                id: albumId
            },
                  include: {
                    canciones: true
                    }  
        })

    if (!album) {
        res.status(404).json({ error: "la cancion no fue encontrada" });
        return;
    }
    res.status(200).json(album);
    } catch (error:any) {
        console.log(error);
        res.status(500).json({ error: "Hubo un error" });
    }
}

export const updateAlbum = async (req:Request, res: Response): Promise<void> => {
    const idAlbum = Number(req.params.id);
    const { titulo, anio, genero, artistaId, artista  } = req.body
    try {
        //aqui nos traemos toda la info del req.body con el spread operator listo para actualizarse
        let albumData:any = {...req.body}
        if (titulo) {
            albumData.titulo=titulo
        }
         if (anio) {
            albumData.anio=anio
        }
         if (genero) {
            albumData.genero=genero
        }
         if (artistaId) {
            albumData.artistaId=artistaId
        }
         if (artista) {
            albumData.artista=artista
        }

        const song = await prisma.update({
            where:{
                id:idAlbum
            },
            data:albumData
        })
        res.status(200).json(song);
    } catch (error:any) {
        if (error?.code === "P2002" && error?.meta?.target?.includes("titulo")) {
      res.status(400).json({ error: "El album ingresado ya existe" });
    } else if (error?.code === "P2025") {
      res.status(400).json({ error: "album no encontrado" });
    } else {
      console.log(error);
      res.status(500).json({ error: "Hubo un error, prueba mas tarde" });
    }
    }
}

export const deleteAlbum = async (req:Request, res: Response): Promise<void> => {
    const idAlbum = Number(req.params.id);
      try {
    await prisma.delete({
      where: {
        id: idAlbum,
      },
    });

    res
      .status(200)
      .json({ message: `El album ${idAlbum} ha sido eliminado con exito` })
      .end();
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: "Hubo un error, prueba mas tarde" });
  }
}