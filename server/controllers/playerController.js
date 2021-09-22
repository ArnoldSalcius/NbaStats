const players = require('../final.json').data;


const searchPlayers = (req, res, next) => {
    const result = [];
    if (req.query.search) {
        const query = req.query.search.toLowerCase();
        //Search with query as start for first name or last name
        for (let i = 0; (i < players.length && result.length < 10); i++) {
            const player = players[i];
            if (player.first_name.toLowerCase().startsWith(query) || player.last_name.toLowerCase().startsWith(query) || player.name.toLowerCase().includes(query)) {
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

const getPlayers = (req, res, next) => {

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
    getPlayers
}