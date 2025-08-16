import express, { type NextFunction, type Request, type Response }  from "express";
import { createAlbum, deleteAlbum, getAlbumById, getAllAlbums, updateAlbum } from "../controllers/albumsController.js";

const router = express.Router()

router.post('/',createAlbum)
router.get('/', getAllAlbums)
router.get('/:id', getAlbumById)
router.put('/:id', updateAlbum)
router.delete('/:id', deleteAlbum)

export default router