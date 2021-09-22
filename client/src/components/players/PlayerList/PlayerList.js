import React, { useState } from 'react';
import PlayerCard from './PlayerCard';
import './PlayerList.css';
import PlayerModal from '../PlayerModal/PlayerModal';

const PlayerList = ({ players, setPlayers, search }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState(null);


    const handleClick = (player) => {
        setIsModalOpen(true);
        setSelectedPlayer(player);
    }

    const renderCards = () => {
        return players.map((player) => {
            return (
                <PlayerCard handleClick={handleClick} key={player.id} player={player} />
            )
        });
    }

    return (
        <div className='PlayerList'>
            {renderCards()}

            {isModalOpen ? <PlayerModal search={search} setPlayers={setPlayers} player={selectedPlayer} isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)} /> : null}
        </div>
    )
}

export default PlayerList
