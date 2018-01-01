import AWS from 'aws-sdk'
import Promise from 'bluebird'
import Consumer from 'sqs-consumer'
import { redisClient } from '../database_redis/index'
import { cassandraClient, insertAds, findAds } from '../database_cassandra/index'
import { region, accessKeyId, secretAccessKey, QueueUrl } from '../aws.config'

AWS.config.update({ region, accessKeyId, secretAccessKey })

export let messages = []

export const findAdsFromDB = async (preferences) => {
  let responseAds = []

  for (const pref of preferences) {
    const category = pref.category

    await findAds(category)
      .then(resp => {
        const ads = resp.rows
        const index = (Math.random() * ads.length) >>> 0
        const randomAd = ads[index]

        responseAds.push(randomAd)
      })
  }

  return responseAds
}

export const sqs = new AWS.SQS({ apiVersion: '2012-11-05' })
export const app = Consumer.create({
  queueUrl: QueueUrl,
  handleMessage: (message, done) => {
    const body = JSON.parse(message.Body)
    const channelId = body.channelId
    let preferences = body.categories

    if (req.body.categories.length > 3) {
      preferences = preferences.sort((a, b) => a.count - b.count).slice(0, 3)
    }

    findAds()
      .then(responseAds => {
        redisClient.set(channelId, JSON.stringify(responseAds), redis.print)
      })

    done()
  }
})

app.on('error', err => console.error(err))
app.start()

sqs.sendMessage = Promise.promisify(sqs.sendMessage)

export const sendMessage = (body) => {
  const MessageBody = JSON.stringify(body)

  return sqs.sendMessage({ QueueUrl, MessageBody })
}