import type { Request, Response } from "express";
import prisma from '../models/songs.js'


export const createSong = async (req:Request, res: Response): Promise<void> => {
    const {titulo, duracion, albumId} = req.body
   try {
     if(!titulo){
        res.status(400).json({error: 'El titulo debe estar incluido'})
    }
    if(!duracion){
        res.status(400).json({error: 'La duracion debe estar incluido'})
    }
    if(!albumId){
        res.status(400).json({error: 'El albumId debe estar incluido'})
    }

    //comprobando que la informacion esta correcta, podemos crear la cancion

    const song = await prisma.create({
        data:{
            titulo,
            duracion,
            albumId
        },
    }) 
    res.status(201).json(song)
   } catch (error:any) {
     
    console.log(error);
    res.status(500).json({ error: "Hubo un error" });
   }
}


export const getAllSongs = async (req:Request, res: Response): Promise<void> => {
try { 
    const songs= await prisma.findMany()
    res.status(200).json(songs)
} catch (error:any) {
    console.log(error);
    res.status(500).json({ error: "Hubo un error" });
}
}

export const getSongById = async (req:Request, res: Response): Promise<void> => {
    const songId = Number(req.params.id);
    try {
        const song = await prisma.findUnique({
            where:{
                id: songId
            }
        })

    if (!song) {
        res.status(404).json({ error: "la cancion no fue encontrada" });
        return;
    }
    res.status(200).json(song);
    } catch (error:any) {
        console.log(error);
        res.status(500).json({ error: "Hubo un error" });
    }
}

export const updateSong = async (req:Request, res: Response): Promise<void> => {
    const songId = Number(req.params.id);
    const {titulo, duracion, albumId} = req.body
    try {
        //aqui nos traemos toda la info del req.body con el spread operator listo para actualizarse
        let songData:any = {...req.body}
        if (titulo) {
            songData.titulo=titulo
        }
         if (duracion) {
            songData.duracion=duracion
        }
         if (albumId) {
            songData.albumId=albumId
        }

        const song = await prisma.update({
            where:{
                id:songId
            },
            data:songData
        })
        res.status(200).json(song);
    } catch (error:any) {
        if (error?.code === "P2002" && error?.meta?.target?.includes("titulo")) {
      res.status(400).json({ error: "La cancion ingresado ya existe" });
    } else if (error?.code === "P2025") {
      res.status(400).json({ error: "cancion no encontrado" });
    } else {
      console.log(error);
      res.status(500).json({ error: "Hubo un error, prueba mas tarde" });
    }
    }
}

export const deleteSong = async (req:Request, res: Response): Promise<void> => {
    const songId = Number(req.params.id);
      try {
    await prisma.delete({
      where: {
        id: songId,
      },
    });

    res
      .status(200)
      .json({ message: `La cancion ${songId} ha sido eliminado con exito` })
      .end();
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: "Hubo un error, prueba mas tarde" });
  }
}



