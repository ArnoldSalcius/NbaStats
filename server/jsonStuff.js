const players = require('./playersInitial.json').data;
const stats = require('./stats.json').data;

const newArr = []


players.forEach((player, i) => {
    const id = player.id;
    !i && console.log(player);
    const filtred = stats.filter((stat) => {
        return stat.player_id === id;
    });
    const maped = filtred.map((el) => el.season);
    newArr.push({
        ...player,
        seasons: maped
    })

})