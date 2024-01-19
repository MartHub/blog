import { useState } from "react";
import { FaBookOpen } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import { LuSubtitles } from "react-icons/lu";
import axiosClient from "../config/axios.js";
import Modal from './Modal';
import EnterForm from './EnterForm';
import PropTypes from 'prop-types';

const EnterCard = ({ entry }) => {
    const [open, setOpen] = useState(false);
    const [detail, setDetail] = useState({});

    const handleObtenerDetalle = async (e) => {
        e.preventDefault();
        const entryDetail = await axiosClient.post('/entrada/entradaById', { ID: entry.id });
        setDetail({
            id: entryDetail.data[0].id,
            titulo: entryDetail.data[0].TITULO,
            fecha: entryDetail.data[0].FECHA,
            autor: entryDetail.data[0].AUTOR,
            comentario: entryDetail.data[0].CONTENIDO,
        });
        setOpen(true);
    };

    return (
        <>
            <div className="justify-between items-center bg-gray-600 text-white py-3 px-4 rounded-md mb-1 cursor-pointer" onClick={(e) => handleObtenerDetalle(e)}>
                <div className="flex items-center gap-x-4">
                    <FaBookOpen className="text-x1 fill-cyan-400 w-6 h-6" /><p className="text-base font-primary text-ellipsis whitespace-nowrap overflow-hidden">{entry.titulo}</p>
                </div>
                <div className="flex items-center gap-x-4">
                    <MdDateRange className="text-x1 fill-cyan-400 w-6 h-6" /><p className="text-base font-primary text-ellipsis whitespace-nowrap overflow-hidden">{entry.fecha}</p>
                </div>
                <div className="flex items-center gap-x-4">
                    <IoPersonCircle className="text-x1 fill-cyan-400 w-6 h-6" /><p className="text-base font-primary text-ellipsis whitespace-nowrap overflow-hidden">{entry.autor}</p>
                </div>
                <div className="flex items-center gap-x-4">
                    <LuSubtitles className="text-x1 fill-cyan-400 w-6 h-6" /><p className="text-base font-primary text-ellipsis whitespace-nowrap overflow-hidden">{entry.comentario}</p>
                </div>
            </div>

            {open &&
                <Modal open={open} onClose={() => setOpen(false)} mode={"detail"}>
                    <EnterForm mode={"detail"} entry={detail} onClose={() => setOpen(false)} />
                </Modal>}
        </>
    );
};

export default EnterCard;

EnterCard.propTypes = {
    entry: PropTypes.shape({
        id: PropTypes.number,
        titulo: PropTypes.string,
        fecha: PropTypes.string,
        autor: PropTypes.string,
        comentario: PropTypes.string,
    }).isRequired,
};