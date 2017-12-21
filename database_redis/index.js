const redis = require('redis')
const Promise = require('bluebird')

Promise.promisifyAll(redis.RedisClient.prototype)
Promise.promisifyAll(redis.Multi.prototype)

client.on('connect', _ => {
  console.log('connected to redis')
})
client.on('error', err => console.error(err))