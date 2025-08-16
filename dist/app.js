import dotenv from 'dotenv';
import express from 'express';
import artistsRoutes from './routes/artistsRoutes.js';
import albumsRoutes from './routes/albumsRoutes.js';
import songsRoutes from './routes/songsRoutes.js';
dotenv.config();
const app = express();
app.use(express.json());
//rutas de la api
app.use('/artists', artistsRoutes);
app.use('/albums', albumsRoutes);
app.use('/songs', songsRoutes);
export default app;
//# sourceMappingURL=app.js.map