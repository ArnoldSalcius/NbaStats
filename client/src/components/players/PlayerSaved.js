import React, { useEffect, useState } from 'react';
import PlayerList from './PlayerList/PlayerList';

const PlayerSaved = () => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem('savedPlayers');
        setPlayers(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem('savedPlayers', JSON.stringify(players));

    }, [players]);




    return (
        <div className='PlayerSaved'>
            <h2>Saved Players </h2>
            <PlayerList players={players} setPlayers={setPlayers} />
        </div>
    )
}

export default PlayerSaved
