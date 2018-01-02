import redis from 'redis'
import Promise from 'bluebird'

export const redisClient = redis.createClient()

Promise.promisifyAll(redis.RedisClient.prototype)

redisClient.on('connect', () => console.log('connected to redis'))
redisClient.on('error', err => console.error(err))