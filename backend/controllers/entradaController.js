import Sequelize from 'sequelize'
import { Entrada } from "../models/Entrada.js";

// Create entrada
const createEntrada = async (req, res) => {
    try {
        const entrada = new Entrada(req.body);
        const savedEntrada = await entrada.save();
        return res.status(200).json(savedEntrada);
    } catch (err) {
        console.error(err);
        const error = new Error(err);
        return res.status(500).json({ msg: error.message });
    }
}

// Get entrada
const getEntrada = async (req, res) => {
    const { ID } = req.body;

    const entradaExists = await Entrada.findOne({
        where: {
            ID
        }
    });

    if (entradaExists === null) {
        return 'Entrada not found';
    }
    return res.status(200).json([entradaExists.dataValues]);
}

// Get All entradas
const getAllEntradas = async (req, res) => {
    const entradas = await Entrada.findAll();
    return res.status(200).json(entradas);
}

// Get entrada filters
const getEntradaFilters = async (req, res) => {
    const { TITULO, AUTOR, CONTENIDO } = req.body;
    const Op = Sequelize.Op;
    const entradas = await Entrada.findAll({
        where: {
            [Op.or]: [
                { TITULO: { [Op.like]: '%' + TITULO + '%' } },
                { AUTOR: { [Op.like]: '%' + AUTOR + '%' } },
                { CONTENIDO: { [Op.like]: '%' + CONTENIDO + '%' } }
            ]
        }
    });
    return res.status(200).json(entradas);
}

export {
    createEntrada,
    getEntrada,
    getAllEntradas,
    getEntradaFilters
}