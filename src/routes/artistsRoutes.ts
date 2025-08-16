import express, { type NextFunction, type Request, type Response }  from "express";
import { createArtist, deleteArtist, getAllArtists, getArtistById, updateArtist } from "../controllers/artistsController.js";

const router = express.Router()

//aqui podriamos ingresar un middleware, pero por ahora no es necesario

router.post('/',createArtist)
router.get('/', getAllArtists)
router.get('/:id', getArtistById)
router.put('/:id', updateArtist)
router.delete('/:id', deleteArtist)

export default router