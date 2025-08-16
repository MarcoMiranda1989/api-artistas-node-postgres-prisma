import prisma from "../models/artists.js";
import album from "../models/albums.js";
export const createArtist = async (req, res) => {
    try {
        //desestructuramos los datos que trae la request para poder validarlos y usarlos
        const { nombre, pais, albums, createdAt, updatedAt } = req.body;
        if (!nombre) {
            res.status(400).json({ error: "El nombre es obligatorio" });
            return;
        }
        if (!pais) {
            res.status(400).json({ error: "El pais es obligatorio" });
            return;
        }
        //Ya que se revisaron todos los errores, procedemos a crear el artista en  la BD usando prisma
        const artist = await prisma.create({
            data: {
                nombre,
                pais,
                albums,
                createdAt,
                updatedAt
            },
        });
        res.status(201).json({ artist });
    }
    catch (error) {
        if (error?.code === "P2002" && error?.meta?.target?.includes("nombre")) {
            res.status(400).json({ message: "el mail ingresado ya existe" });
        }
        console.log(error);
        res.status(500).json({ error: "Hubo un error" });
    }
};
export const getAllArtists = async (req, res) => {
    try {
        const artists = await prisma.findMany({
            include: {
                albums: {
                    include: {
                        canciones: true
                    }
                }
            }
        });
        res.status(200).json(artists);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Hubo un error" });
    }
};
export const getArtistById = async (req, res) => {
    const artistId = Number(req.params.id);
    try {
        const artist = await prisma.findUnique({
            where: {
                id: artistId
            },
            include: {
                albums: {
                    include: {
                        canciones: true
                    }
                }
            }
        });
        if (!artist) {
            res.status(404).json({ error: "la cancion no fue encontrada" });
            return;
        }
        res.status(200).json(artist);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Hubo un error" });
    }
};
export const updateArtist = async (req, res) => {
    const artistId = Number(req.params.id);
    const { nombre, pais, albums, createdAt, updatedAt } = req.body;
    try {
        //aqui nos traemos toda la info del req.body con el spread operator listo para actualizarse
        let artistData = { ...req.body };
        if (nombre) {
            artistData.nombre = nombre;
        }
        if (pais) {
            artistData.duracion = pais;
        }
        if (albums) {
            artistData.albumId = albums;
        }
        const artist = await prisma.update({
            where: {
                id: artistId
            },
            data: artistData
        });
        res.status(200).json(artist);
    }
    catch (error) {
        if (error?.code === "P2002" && error?.meta?.target?.includes("nombre")) {
            res.status(400).json({ error: "El artista ingresado ya existe" });
        }
        else if (error?.code === "P2025") {
            res.status(400).json({ error: "artsta no encontrado" });
        }
        else {
            console.log(error);
            res.status(500).json({ error: "Hubo un error, prueba mas tarde" });
        }
    }
};
export const deleteArtist = async (req, res) => {
    const artistId = Number(req.params.id);
    try {
        await prisma.delete({
            where: {
                id: artistId,
            },
        });
        res
            .status(200)
            .json({ message: `El artista ${artistId} ha sido eliminado con exito` })
            .end();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Hubo un error, prueba mas tarde" });
    }
};
//# sourceMappingURL=artistsController.js.map