const redis = require('redis');
const client = redis.createClient();
(async () => {
    client.on('connect', function () {
        console.log('redis Connected!');
    });
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
})();


module.exports = client;

