const redis = require('redis');
const util = require('util');

const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);

if (typeof client.hGet === 'function') {
    client.hGet = util.promisify(client.hGet).bind(client);
}


module.exports = client;




