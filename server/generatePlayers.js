const axios = require('axios');
const fs = require('fs');
const qs = require('qs')

let mainArr = [];
const sStart = 1983;
const sFinish = 2020;

const players = JSON.parse(fs.readFileSync('players.json')).data;
const stats = JSON.parse(fs.readFileSync('stats.json')).data;
const final = JSON.parse(fs.readFileSync('final.json')).data;

const getPlayerIds = (page = 1) => {
    axios.get('https://www.balldontlie.io/api/v1/players', {
        params: {
            per_page: 100,
            page
        }
    }).then((res) => {
        const arr = res.data.data.map((player) => ({ ...player, name: `${player.first_name} ${player.last_name}` }));
        mainArr = [...mainArr, ...arr];
        if (players?.data?.length === res.data.meta.total_count) {
            console.log('no new players');
            return;
        }
        if (res.data.meta.next_page) {
            getPlayerIds(res.data.meta.next_page);
        } else {
            const stringified = JSON.stringify({
                data: mainArr
            })
            fs.writeFile('players.json', stringified, (err) => {
                if (err) return console.log(err);
                console.log('succesfully wrote to json file');
            })
        }
    }).catch(e => console.log(e));
}

// getPlayerIds();



let playerStats = [];
const getStats = (num = 0, season = sStart) => {
    const incBy = 400;

    const max = ((num + incBy) > players.length) ? players.length - 1 : num + incBy;

    console.log(num, max, season);
    const playerParam = players.slice(num, max).map(player => player.id);

    axios.get('https://www.balldontlie.io/api/v1/season_averages', {
        params: {
            season: season,
            player_ids: playerParam
        },

    }).then(res => {
        console.log(res.data);
        playerStats = [...playerStats, ...res.data.data];
        if (max + 1 === players.length && season === sFinish) {
            fs.writeFileSync('stats.json', JSON.stringify({
                data: playerStats
            }))
            console.log('Should be done');
            return;
        } else if (max + 1 === players.length) {
            setTimeout(() => {
                getStats(0, season + 1)
            }, 7000)
        } else {
            getStats(num + incBy, season);
        }
    }).catch(e => {
        console.log(e);
    })
};

// getStats();

const finalArr = [];
const getSeasons = () => {
    stats.map((stat) => {
        const finalPlayer = finalArr.find((player) => player.id === stat.player_id);
        if (finalPlayer) {

            finalPlayer.seasons = [...finalPlayer.seasons, stat.season];
            return;
        }
        const player = players.find((player) => player.id === stat.player_id);
        player.seasons = [stat.season];
        finalArr.push(player)
    });
    fs.writeFileSync('final.json', JSON.stringify({ data: finalArr }))
    console.log(finalArr.length);
};


getSeasons();

// const combineArrays = () => {
//     const lastarr = last.data;
//     const playerArr = players.data;
//     const finalarr = [];

//     for(let i = 0; i < lastarr.length; i++){
//         finalarr.push({...last})
//     }

//     fs.writeFileSync('final.json', JSON.stringify({data: }))
// }