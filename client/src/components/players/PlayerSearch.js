import React, { useState } from 'react'
import SearchAutocomplete from '../common/SearchAutocomplete';
import { searchPlayer } from '../../services/api';
import './PlayerSearch.css'
import PlayerList from './PlayerList/PlayerList';
import { RiCheckboxCircleFill } from 'react-icons/ri';

const PlayerSearch = () => {
    const [players, setPlayers] = useState([]);


    return (
        <div className='PlayerSearch'>
            <h1>Search your favorite NBA players!</h1>
            <p>Players available from 1983-2022!</p>
            <hr />
            <div className='search'>
                <SearchAutocomplete label='Enter Player name: ' searchItems={searchPlayer} items={players} setItems={(players) => setPlayers(players)} />

                <div className='icon'><RiCheckboxCircleFill size='24px' /><span>&nbsp; - denotes active player as of 2020-2022 season</span></div>
            </div>
            {/* Do not set players, rather handle saving within component (localstorage) */}
            <PlayerList players={players} setPlayers={() => { }} search />
        </div>
    )
}

export default PlayerSearch
