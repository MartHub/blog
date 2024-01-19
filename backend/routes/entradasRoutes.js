import express from "express";
import { createEntrada, getEntrada, getAllEntradas, getEntradaFilters } from "../controllers/entradaController.js";

const router = express.Router();

// Route to create entrada
router.post('/', createEntrada);

// Route to get entrada
router.post('/entradaById', getEntrada);

// Route to get all entradas
router.post('/all', getAllEntradas);

// Route to get entradas filters
router.post('/filters', getEntradaFilters);

export default router;