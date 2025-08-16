import app from './app.js';
const PORT = Number(process.env.PORT) || 3000; // ✅ Convierte a número
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is running on PORT ${PORT}`);
});
//# sourceMappingURL=server.js.map