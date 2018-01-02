import AWS from 'aws-sdk'
import Promise from 'bluebird'
import Consumer from 'sqs-consumer'
import redis from 'redis'
import { redisClient } from '../database_redis/index'
import { cassandraClient, insertAds, findAds } from '../database_cassandra/index'
import { region, accessKeyId, secretAccessKey, QueueUrl } from '../eventSQS.config'

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

    if (preferences.length > 3) {
      preferences = preferences.sort((a, b) => a.count - b.count).slice(0, 3)
    }
    
    findAdsFromDB(preferences)
      .then(responseAds => {
          redisClient.set(channelId, JSON.stringify(responseAds), redis.print)
          done()
        })

  }
})

app.on('error', err => console.error(err))
app.start()

export const sendMessage = (body) => {
  const MessageBody = JSON.stringify(body)

  return sqs.sendMessage({ QueueUrl, MessageBody })
}



// sendMessage({
//     "channelId": "UC_x5XG1OV2P6uZZ5FSM9Ttw",
//     "categories": [{
//       "category": "Comedy",
//       "count": 4
//     }, {
//       "category": "Drama",
//       "count": 7
//     }]
//   })
//   .then(m => {
//     console.log('message sent')
//     console.log(m)
//   })