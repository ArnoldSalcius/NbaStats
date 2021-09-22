import axios from 'axios';

const api = axios.create();

export const searchPlayer = (searchTerm) => {
    return api.get('/api/players', {
        params: {
            search: searchTerm
        }
    }).then(res => res.data.data);
}

export default api;