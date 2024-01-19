import { useState, useEffect } from 'react'
import styles from "./style";
import { GiFishMonster } from "react-icons/gi";
import './App.css'
import EnterList from "./components/EnterList";
import Modal from './components/Modal';
import EnterForm from './components/EnterForm';
import { Offline, Online } from "react-detect-offline";
import axiosClient from "./config/axios.js";

function App() {
  const [open, setOpen] = useState(false);
  const [entries, setEntries] = useState([]);
  const entry = {
    titulo: '',
    fecha: '',
    autor: '',
    comentario: '',
  };

  useEffect(() => {
    handleCloseModal();
  }, []);

  const handleCloseModal = async (e) => {
    e?.preventDefault();
    setOpen(false);
    const entries = await axiosClient.post('/entrada/filters', {
      TITULO: "",
      AUTOR: "",
      CONTENIDO: "",
    });
    let entriesData = [];
    entries.data?.forEach(entry => {
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
    <>
      <div className='bg-primary w-full overflow-hidden'>
        <div className='w-full h-screen text-4xl text-white flex items-center justify-center'>
          <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
              <div className="flex justify-center">
                Blog de la Vida Marina <GiFishMonster className="text-x1 fill-white pt-2 w-10 h-10  " />
              </div>
              <div className="flex justify-center pt-4">
                <Online>
                  <button className="text-base bg-gray-700 border-none p-2 text-white cursor-pointer rounded ml-2" onClick={() => setOpen(true)}>Agregar entrada</button>
                </Online>
                <Offline>
                  <p className=' text-2xl text-black font-bold'>¡Estas desconectado! Por favor revisa tu conexión a internet.</p>
                </Offline>
              </div>
              <EnterList entries={entries} setEntries={setEntries} />
            </div>
          </div>
        </div>
      </div>
      {open &&
        <Modal open={open} onClose={() => setOpen(false)} mode='create'>
          <EnterForm mode='create' onClose={(e) => handleCloseModal(e)} entry={entry} />
        </Modal>}
    </>
  )
}

export default App
