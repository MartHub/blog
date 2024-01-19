import axiosClient from "../config/axios.js";
import PropTypes from 'prop-types';

const SearchForm = ({ setEntries }) => {
    const handleSearch = async (e) => {
        e.preventDefault();
        const { value } = e.target;
        const entries = await axiosClient.post('/entrada/filters', { TITULO: value.trim(), AUTOR: value.trim(), CONTENIDO: value.trim() });
        let entriesData = [];
        entries.data.forEach(entry => {
            entriesData.push({
                id: entry.id,
                titulo: entry.TITULO,
                fecha: entry.FECHA,
                autor: entry.AUTOR,
                comentario:
                    entry.CONTENIDO?.length > 70 ?
                        entry.CONTENIDO?.substring(0, 70) + '...' :
                        entry.CONTENIDO,
            });
        });
        setEntries(entriesData);
    }

    return (
        <input type="text" className=" text-base outline-none bg-transparent border border-gray-500 p-4 w-full text-white mb-8 rounded placeholder:text-gray-300" placeholder="Busca por título, autor o contenido" onChange={(e) => handleSearch(e)} />
    )
}

export default SearchForm;

SearchForm.propTypes = {
    setEntries: PropTypes.func.isRequired,
};