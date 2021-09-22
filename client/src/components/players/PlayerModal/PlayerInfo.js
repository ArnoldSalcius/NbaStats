import React, { useState, useEffect } from 'react';
import './PlayerInfo.css';
import { getStats } from '../../../services/bdlApi';
import Button from '../../common/Button';
import { RiCheckboxCircleFill } from 'react-icons/ri'

const PlayerInfo = ({ modalRef, player, handleClose, setPlayers, search }) => {

    const [stats, setStats] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState(player.seasons[player.seasons.length - 1]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdded, setIsAdded] = useState(findIsAdded(player));

    useEffect(async () => {
        if (!stats.find((el) => el.season === selectedSeason)) {
            try {
                const results = await getStats(player.id, selectedSeason);
                setStats([...stats, { season: selectedSeason, data: results.data[0] }]);
                setIsLoading(false);
            } catch (e) {
                //close if error, most likely too many requests
                handleClose();
            }

        }

    }, [selectedSeason]);



    function AddPlayerToSaved(player) {

        const playersJSON = localStorage.getItem('savedPlayers');
        const players = JSON.parse(playersJSON);
        let newPlayers;
        if (players) {
            const foundPlayer = players.findIndex(savedPlayer => savedPlayer.id === player.id);
            if (foundPlayer !== -1) {
                newPlayers = players.filter(savedPlayer => savedPlayer.id !== player.id);
                console.log(newPlayers);
            } else {
                newPlayers = [...players, player];
            }
        } else {
            newPlayers = [player];
        }
        setPlayers(newPlayers);
        localStorage.setItem('savedPlayers', JSON.stringify(newPlayers));

    }


    const renderSeasons = () => {
        return player.seasons.map((season) => {
            let cName = 'small';
            if (season === selectedSeason) {
                cName = 'small primary'
            }
            return (
                <Button cName={cName} key={season} onClick={() => setSelectedSeason(season)}>
                    {season}
                </Button>
            )
        })
    }


    const renderAddButton = () => {
        //if in search screen and already added, put a check mark instead
        if (isAdded && search) {
            return (
                <Button cName='success round' >
                    <RiCheckboxCircleFill size='24px' />
                </Button>
            )
        }
        return isAdded ? (
            <Button cName='danger round' onClick={() => { AddPlayerToSaved(player); setIsAdded(false) }}>
                -
            </Button>
        ) : (
            <Button cName='primary round' onClick={() => { AddPlayerToSaved(player); setIsAdded(true) }}>
                +
            </Button>
        )
    }


    const renderStats = () => {


        const isStats = stats.find(({ season }) => season === selectedSeason);
        if (isStats) {
            const curStats = isStats.data;
            return (
                <div className='stats'>
                    <Button cName='modal-close danger small font' onClick={handleClose}>X</Button>
                    <h2>{player.name}</h2>
                    <h2>{selectedSeason}</h2>
                    <hr />

                    <ul className='stats-list'>
                        <li>Games Played: {curStats.games_played}</li>
                        <li>Pts per game: {curStats.pts}</li>
                        <li>Assists per game: {curStats.ast}</li>
                        <li>Rebounds per game: {curStats.reb}</li>
                    </ul>
                    <div>
                        Change season:
                        {renderSeasons()}
                    </div>
                    <div className='player-save'>
                        <h3>
                            Add Player to saved list:
                        </h3>
                        {renderAddButton()}
                    </div>

                </div>
            )
        }

    }



    return !isLoading && (
        <div ref={modalRef} className='PlayerInfo' >
            {renderStats()}
        </div >
    );
}

export default PlayerInfo


const findIsAdded = (player) => {
    const currentSaved = JSON.parse(localStorage.getItem('savedPlayers'));
    let found;
    if (currentSaved) {
        found = currentSaved.find((el) => el.id === player.id);
    }
    return found ? true : false;
};