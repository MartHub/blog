import Sequelize from 'sequelize'
import db from '../config/db.js'

export const Entrada = db.define('entrada', {

    TITULO: {
        type: Sequelize.STRING,
        required: true
    },
    AUTOR: {
        type: Sequelize.STRING,
        required: true
    },
    FECHA: {
        type: Sequelize.DATE,
        required: true
    },
    CONTENIDO: {
        type: Sequelize.STRING,
        required: true
    },    
}, {
    freezeTableName: true,
    tableName: 'entradas'
})