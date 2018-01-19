import redis from 'redis'
import Promise from 'bluebird'

export const redisClient = redis.createClient('6379', '172.31.7.89', {no_ready_check: true})

Promise.promisifyAll(redis.RedisClient.prototype)

redisClient.on('connect', () => console.log('connected to redis'))
redisClient.on('error', err => console.error(err))
