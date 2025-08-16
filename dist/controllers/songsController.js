import prisma from '../models/prisma.js'; // <-- import del cliente completo
export const createSong = async (req, res) => {
    const { titulo, duracion, albumId } = req.body;
    try {
        if (!titulo) {
            res.status(400).json({ error: 'El titulo debe estar incluido' });
            return;
        }
        if (!duracion) {
            res.status(400).json({ error: 'La duracion debe estar incluido' });
            return;
        }
        if (!albumId) {
            res.status(400).json({ error: 'El albumId debe estar incluido' });
            return;
        }
        const song = await prisma.cancion.create({
            data: {
                titulo,
                duracion,
                albumId
            },
        });
        res.status(201).json(song);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Hubo un error" });
    }
};
export const getAllSongs = async (req, res) => {
    try {
        const songs = await prisma.cancion.findMany();
        res.status(200).json(songs);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Hubo un error" });
    }
};
export const getSongById = async (req, res) => {
    const songId = Number(req.params.id);
    try {
        const song = await prisma.cancion.findUnique({
            where: { id: songId }
        });
        if (!song) {
            res.status(404).json({ error: "la cancion no fue encontrada" });
            return;
        }
        res.status(200).json(song);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Hubo un error" });
    }
};
export const updateSong = async (req, res) => {
    const songId = Number(req.params.id);
    const { titulo, duracion, albumId } = req.body;
    try {
        let songData = { ...req.body };
        if (titulo)
            songData.titulo = titulo;
        if (duracion)
            songData.duracion = duracion;
        if (albumId)
            songData.albumId = albumId;
        const song = await prisma.cancion.update({
            where: { id: songId },
            data: songData
        });
        res.status(200).json(song);
    }
    catch (error) {
        if (error?.code === "P2002" && error?.meta?.target?.includes("titulo")) {
            res.status(400).json({ error: "La cancion ingresado ya existe" });
        }
        else if (error?.code === "P2025") {
            res.status(400).json({ error: "cancion no encontrado" });
        }
        else {
            console.log(error);
            res.status(500).json({ error: "Hubo un error, prueba mas tarde" });
        }
    }
};
export const deleteSong = async (req, res) => {
    const songId = Number(req.params.id);
    try {
        await prisma.cancion.delete({
            where: { id: songId },
        });
        res.status(200).json({ message: `La cancion ${songId} ha sido eliminado con exito` }).end();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Hubo un error, prueba mas tarde" });
    }
};
//# sourceMappingURL=songsController.js.map