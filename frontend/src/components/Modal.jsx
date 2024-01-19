import PropTypes from 'prop-types';

export default function Modal({ open, onClose, children, mode }) {
    return (
        <div onClick={(e) => e.stopPropagation()} className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-black/20" : "invisible"}`}>
            <div className={`bg-primary rounded-xl shadow w-96 p-6 pt-2 transition-all ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                <div className="flex items-start justify-between p-5 pt-0 border-b border-solid border-gray-300 rounded-t ">
                    <h3 className=" cursor-default text-3xl font=semibold text-white w-full justify-center text-center">{mode !== 'detail' ? 'Nueva entrada' : 'Detalle'}</h3>
                    <button onClick={onClose} className="text-xl mt-0 absolute top-2 right-2 p-1 hover:text-gray-600">
                        X
                    </button>
                </div>
                {children}
            </div>
        </div >
    )
}

Modal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    mode: PropTypes.string.isRequired,
};
