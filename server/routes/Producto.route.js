import express from 'express';
import productoController from '../controllers/Producto.controller.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync, existsSync } from 'fs';

const router = express.Router();

// Configuración de multer para subir imágenes JPG
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '..', 'uploads');

// Asegurar que el directorio de subidas exista
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const base = path.basename(file.originalname, ext).replace(/[^a-z0-9-_]/gi, '_');
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}-${base}${ext}`);
  }
});

const fileFilter = (_req, file, cb) => {
  const mime = file.mimetype.toLowerCase();
  if (mime === 'image/jpeg' || mime === 'image/jpg') return cb(null, true);
  cb(new Error('Solo se permiten imágenes JPG'));
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

router.post('/', upload.single('imagen'), productoController.producto);
router.get('/', productoController.obtenerTodosLosProductos);
router.get('/:id', productoController.productoPorID);
router.put('/:id', upload.single('imagen'), productoController.actualizarProducto);
router.delete('/:id', productoController.eliminarProducto);

export default router;
