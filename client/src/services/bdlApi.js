import axios from 'axios';

const api = axios.create({
    params: {
        per_page: 100
    }
});

export const getStats = (id, season) => {
    return api.get('https://www.balldontlie.io/api/v1/season_averages', {
        params: {
            season,
            player_ids: [id]
        }
    }).then(res => res.data);

}

