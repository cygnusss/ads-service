// const redis = require('redis');
// const Promise = require('bluebird');

// Promise.promisifyAll(redis.RedisClient.prototype);
// Promise.promisifyAll(redis.Multi.prototype);

// const id = 200;
// const client = redis.createClient();
// const getFakeAd = require('../faker/script');

// client.on('connect', _ => {
//   console.log('connected to redis')
//   client.HGETALL('7fUEczVlf', redis.print)
// });
// client.on('error', err => console.error(err));


// // let i = 0; do {
// //   const fakeAd = getFakeAd();
// //   console.log('ID:', fakeAd.id);
// //   client.set(fakeAd.id, JSON.stringify(fakeAd), redis.print);
// //   ++i;
// // } while (i <= 10);