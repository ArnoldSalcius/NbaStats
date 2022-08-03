const axios = require('axios');
// const fs = require('fs');
const redis = require('redis');
//File used to generate a new JSON file with player names, ids, and seasons played
// Outputs final.json


const sStart = 2020;
const sFinish = new Date().getFullYear();

let mainArr = [];
const getPlayerIds = (cb, season, page = 1) => {
    axios.get('https://www.balldontlie.io/api/v1/players', {
        params: {
            per_page: 100,
            page
        }
    }).then((res) => {
        const arr = res.data.data.map((player) => ({ ...player, name: `${player.first_name} ${player.last_name}` }));
        mainArr = [...mainArr, ...arr];

        if (res.data.meta.next_page) {
            getPlayerIds(cb, season, res.data.meta.next_page);
        } else {

            if (!season || season < 1981) {
                season = sStart
            }

            setTimeout(() => {
                getStats(mainArr, cb, season);

            }, 15000);

        }
    }).catch(e => console.log(e));
}



let playerStats = [];
const getStats = (players, cb, season = sStart, num = 0) => {
    const incBy = 400;

    const max = ((num + incBy) > players.length) ? players.length - 1 : num + incBy;

    const playerParam = players.slice(num, max).map(player => player.id);

    //Searching for 1981 for player 2417 returns an error
    let errorOnes = [2417, 2433, 2518, 2521, 2527];
    if (season === 1981) {
        errorOnes.forEach((num) => {
            const index = playerParam.indexOf(num);
            if (index > -1) {
                console.log('I removed');
                playerParam.splice(index, 1);
            }
        })
    } else if (season === 1982) {
        errorOnes = [2646]
        errorOnes.forEach((num) => {
            const index = playerParam.indexOf(num);
            if (index > -1) {
                console.log('I removed');
                playerParam.splice(index, 1);
            }
        })
    }
    axios.get('https://www.balldontlie.io/api/v1/season_averages', {
        params: {
            season: season,
            player_ids: playerParam
        },

    }).then(res => {
        console.log(res.data.data[0]);
        console.log(season);
        playerStats = [...playerStats, ...res.data.data];
        if (max + 1 === players.length && season >= new Date().getFullYear()) {
            getSeasons(playerStats, players, cb);
            return;
        } else if (max + 1 === players.length) {
            setTimeout(() => {
                getStats(players, cb, season + 1, 0)
            }, 10000);
        } else {
            getStats(players, cb, season, num + incBy);
        }
    }).catch(e => {
        console.log(e);
    })
};

const finalArr = [];

const getSeasons = (stats, players, cb) => {
    //sita perrasyt kad butu atvirksciai player mapintu pagal status o ne status pagal playeri

    players.forEach((player, i) => {
        const id = player.id;
        !i && console.log(player);
        const filtred = stats.filter((stat) => {
            return stat.player_id === id;
        });
        const maped = filtred.map((el) => el.season);
        finalArr.push({
            ...player,
            seasons: maped
        })
    });
    console.log('generate players done');
    moveToRedis(finalArr, cb);
};


const moveToRedis = (arr, cb) => {
    const client = redis.createClient({ url: process.env.REDIS_URL || null });
    const str = JSON.stringify(arr);
    client.on('error', (err) => console.log('Redis Client Error', err));
    client.connect().then(() => {
        client.set('players', str).then(() => {
            cb();
        })
    }).catch(e => {
        console.log(e);
    })
}


module.exports = {
    getPlayerIds
}