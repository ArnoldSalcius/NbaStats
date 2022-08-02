import React from 'react';
import { RiCheckboxCircleFill } from 'react-icons/ri';
import './PlayerCard.css'

const currentSeason = 2021;
const PlayerCard = ({ player, handleClick }) => {
    console.log(player);

    const isActive = player.seasons.find((el) => el === currentSeason);

    return (
        <div className='PlayerCard' onClick={() => { handleClick(player) }}>
            <div className='playerHeader'>
                <h2>{player.name}</h2>
                {isActive && <div id='icon'><RiCheckboxCircleFill size='24px' color='green' /></div>}
            </div>
            <p>{player.team.full_name}</p>

        </div>
    )
}





// function getPosition(position) {
//     switch (position) {
//         case 'F':
//         case ''
//     }
// }

export default PlayerCard
