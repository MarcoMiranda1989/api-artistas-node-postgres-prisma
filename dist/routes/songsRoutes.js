import express, {} from "express";
import { createSong, deleteSong, getAllSongs, getSongById, updateSong } from "../controllers/songsController.js";
const router = express.Router();
//aqui podriamos ingresar un middleware, pero por ahora no es necesario
router.post('/', createSong);
router.get('/', getAllSongs);
router.get('/:id', getSongById);
router.put('/:id', updateSong);
router.delete('/:id', deleteSong);
export default router;
//# sourceMappingURL=songsRoutes.js.map