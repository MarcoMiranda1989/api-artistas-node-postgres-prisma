import dotenv from 'dotenv';
import express from 'express';
import artistsRoutes from './routes/artistsRoutes.js';
import albumsRoutes from './routes/albumsRoutes.js';
import songsRoutes from './routes/songsRoutes.js';
import cors from "cors";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
// 🔍 Middleware de debugging
app.use((req, res, next) => {
    console.log(`🔄 ${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
    console.log('📋 Body:', JSON.stringify(req.body));
    console.log('🏷️ Content-Type:', req.get('Content-Type'));
    next();
});
//rutas de la api
app.use('/artists', artistsRoutes);
app.use('/albums', albumsRoutes);
app.use('/songs', songsRoutes);
// 🏠 Health check
app.get('/', (req, res) => {
    res.json({
        message: 'API funcionando correctamente',
        timestamp: new Date().toISOString(),
        routes: ['/artists', '/albums', '/songs']
    });
});
export default app;
//# sourceMappingURL=app.js.map