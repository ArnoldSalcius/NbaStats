import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import PlayerInfo from './PlayerInfo';
import './PlayerModal.css'

const modalRoot = document.getElementById('ModalRoot');


const PlayerModal = ({ handleClose, isOpen, player, setPlayers, search }) => {

    const modalRef = useRef(null);

    const container = document.createElement('PlayerModal');

    container.setAttribute('id', 'PlayerModal');
    modalRoot.appendChild(container);



    useEffect(() => {
        if (isOpen) {
            function handleClickOutside(event) {
                if (modalRef.current && !modalRef.current.contains(event.target)) {
                    handleClose();
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }

    }, [modalRef, isOpen]);



    //Remove container on cleanup
    useEffect(() => {
        return () => {
            modalRoot.removeChild(container);
        }
    })

    return ReactDOM.createPortal(<PlayerInfo search={search} player={player} setPlayers={setPlayers} modalRef={modalRef} handleClose={handleClose} />, container);
}


export default PlayerModal;