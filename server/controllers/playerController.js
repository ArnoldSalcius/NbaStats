const { getPlayerIds, err1, err2, err3 } = require('../generatePlayers');
const redis = require('redis');

//Keep in memory or parse every time?
//how to handle updates?
let players = [];
let loading = false;
let redisError = false
let iRan = false;

const client = redis.createClient({ url: process.env.REDIS_URL || null });
client.on('error', (err) => {
    redisError = true;
    console.log('Redis Client Error', err)
});

const loadInitial = async (cb) => {
    if (!loading) {
        loading = true;

        await client.connect();
        const a = await client.get('players');
        players = JSON.parse(a) || [];
        await client.disconnect();
        if (!players.length) {
            iRan = true;

            getPlayerIds(cb);
        }
    } else {
        console.log('whoa slow down there buddy');
    }

}
loadInitial(refreshPlayers);


const test = async (req, res) => {
    await client.connect();
    const key = await client.get('key');
    await client.disconnect();

    res.json({
        loading,
        redisError,
        length: players.length,
        key,
        iRan,
        err1,
        err2,
        err3
    });
}

async function refreshPlayers() {
    await client.connect();
    const a = await client.get('players');
    players = JSON.parse(a) || [];
    loading = false;
    await client.disconnect();
}


const searchPlayers = async (req, res, next) => {
    const result = [];
    if (req.query.search) {
        const query = req.query.search.toLowerCase();
        //Search with query as start for first name or last name
        for (let i = 0; (i < players.length && result.length < 10); i++) {
            const player = players[i];
            const fullName = (player.first_name + ' ' + player.last_name).toLowerCase();;


            if (fullName.toLowerCase().startsWith(query) || player.last_name.toLowerCase().startsWith(query)) {
                result.push(player);
            }
        }
        //If less than 10 results, try to find more with containing string
        if (result.length < 10) {
            for (let i = 0; (i < players.length && result.length < 10); i++) {
                const player = players[i];
                if (player.first_name.toLowerCase().includes(query) || player.last_name.toLowerCase().includes(query)) {
                    if (!result.find(resultPlayer => resultPlayer.name === player.name)) {
                        result.push(player);
                    }
                }
            }
        }
    }
    res.json({ data: result });
};

const getPlayers = async (req, res, next) => {

    let result = [];
    if (req.query.players) {
        //Get playersId from query comma separated list, map it to be integers and filter ids that are out of range
        const playersId = req.query.players.split(',').map(id => parseInt(id)).filter(id => (id > 0 && id < players.length));
        //for each id return player that is found with that id
        result = playersId.map((id) => {
            return players.find(player => player.id === id);
        });
    }
    return res.json({ data: result });

}


module.exports = {
    searchPlayers,
    getPlayers,
    test
}