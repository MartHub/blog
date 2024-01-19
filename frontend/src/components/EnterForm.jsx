import { useState } from 'react';
import PropTypes from 'prop-types';
import axiosClient from "../config/axios.js";

const EnterForm = ({ onClose, mode, entry }) => {
    const [form, setFom] = useState({
        titulo: entry?.titulo,
        fecha: entry?.fecha,
        autor: entry?.autor,
        comentario: entry?.comentario,
    });

    const onChange = event => {
        const { name, value } = event.target;
        setFom(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const obj = {
            TITULO: form.titulo,
            AUTOR: form.autor,
            FECHA: form.fecha,
            CONTENIDO: form.comentario,
        }
        let isInvalid = !Object.values(obj).every(o => o !== null && o !== '');
        if (!isInvalid) {
            await axiosClient.post('/entrada', obj);
            onClose();
        }
    };

    return (
        <>
            <form className="w-full max-w-lg">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <input className="text-base appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="text"
                            placeholder="Título"
                            name="titulo"
                            value={form?.titulo}
                            onChange={onChange}
                            maxLength={50}
                            disabled={mode === 'detail'}
                            required />
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <input className="text-base appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="text"
                            placeholder="Autor"
                            name="autor"
                            value={form.autor}
                            onChange={onChange}
                            maxLength={50}
                            disabled={mode === 'detail'}
                            required />
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <input className="text-base appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="date"
                            placeholder="Fecha"
                            name="fecha"
                            value={form.fecha}
                            onChange={onChange}
                            disabled={mode === 'detail'}
                            required />

                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <textarea className="text-base resize-none appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="text"
                            placeholder="Comentario"
                            name="comentario"
                            value={form.comentario}
                            onChange={onChange}
                            maxLength={200}
                            disabled={mode === 'detail'}
                            required />
                    </div>
                </div>

                {mode !== "detail" && (
                    <button className=" w-full max-w-lg text-base bg-gray-500 border-none p-2 text-white cursor-pointer rounded" onClick={(e) => handleSave(e)}>Agregar</button>
                )}

            </form>
        </>
    );
};

export default EnterForm;

EnterForm.propTypes = {
    onClose: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired,
    entry: PropTypes.shape({
        id: PropTypes.number,
        titulo: PropTypes.string.isRequired,
        fecha: PropTypes.string.isRequired,
        autor: PropTypes.string.isRequired,
        comentario: PropTypes.string.isRequired,
    }).isRequired,
};