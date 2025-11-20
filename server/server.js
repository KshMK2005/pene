import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import productoRoutes from './routes/Producto.route.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync, readFileSync } from 'fs';
import swaggerUi from 'swagger-ui-express';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos subidos (imágenes)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadPath = path.join(__dirname, 'uploads');
mkdirSync(uploadPath, { recursive: true });
app.use('/uploads', express.static(uploadPath));

// Swagger UI (si el archivo swagger-output.json existe)
try {
  const swaggerPath = path.join(__dirname, 'swagger-output.json');
  const swaggerDocument = JSON.parse(readFileSync(swaggerPath, 'utf8'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log('✅ Documentación Swagger configurada correctamente');
} catch (err) {
  console.log('ℹ️  swagger-output.json no encontrado aún. Genera la documentación con: npm run swagger');
}

// Conexión a MongoDB
console.log('🚀 Iniciando conexión a MongoDB...');
mongoose.connect('mongodb://localhost:27017/api4', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Conectado exitosamente a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Rutas
app.use('/api/productos', productoRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`\n✨ Servidor corriendo en: http://localhost:${PORT}`);
  console.log('📚 Documentación de la API:');
  console.log(`   - Swagger UI:  http://localhost:${PORT}/api-docs`);
  console.log('\n🔍 Endpoints disponibles:');
  console.log(`   - GET     http://localhost:${PORT}/api/productos`);
  console.log(`   - GET     http://localhost:${PORT}/api/productos/:id`);
  console.log(`   - POST    http://localhost:${PORT}/api/productos`);
  console.log(`   - PUT     http://localhost:${PORT}/api/productos/:id`);
  console.log(`   - DELETE  http://localhost:${PORT}/api/productos/:id`);
  console.log('\n🔧 Para detener el servidor, presiona: Ctrl + C');
  console.log('\n✅ Listo para recibir peticiones...\n');
});
