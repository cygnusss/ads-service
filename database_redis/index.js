const redis = require('redis')
const Promise = require('bluebird')

const redisClient = redis.createClient()

// Promise.promisifyAll(redis.RedisClient.prototype)
// Promise.promisifyAll(redis.Multi.prototype)

redisClient.on('connect', _ => {
  console.log('connected to redis')
})
redisClient.on('error', err => console.error(err))

module.exports.redisClient = redisClient
module.exports.redis = redis