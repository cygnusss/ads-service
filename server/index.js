const express = require('express')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const app = express()
const cassandra = require('cassandra-driver')
const { redis, redisClient } = require('../database_redis/index')
const { cassandraClient, insertAds, findAds } = require('./database_cassandra/index')

app.use(bodyParser())

app.get('/', (req, resp) => {
  // TO BE CONTINUETDED
  resp.status(200).end('HAHA')
})

app.get('/ads', (req, resp) => {
  // TO BE CONTINUETDED
  resp.status(200).end('HAHA')
})

app.post('/ads', (req, resp) => {
  const id = cassandra.types.uuid()
  const img = req.body.img
  const siteLink = req.body.siteLink
  const category = req.body.category


  insertAds(id, img, siteLink, category)
    .then((result) => {
      resp
        .status(202)
        .end()
    })
    .catch(err => {
      throw err
    })
})

app.post('/events', (req, resp) => {
  /*
    {
      "channelId": "UC_x5XG1OV2P6uZZ5FSM9Ttw",
      "categories": [{
        "category": "Comedy",
        "count": 4
      }, {
        "category": "Drama",
        "count": 7
      }]
    }
  */
  const preferences = req.body.categories.length > 3 
                      ? req.body.categories
                          .sort((a, b) => {
                            return a.count - b.count
                          })
                          .slice(0, 3)
                      : req.body.categories
  
  const channelId = req.body.channelId

  const findAds = async () => {
    let responseAds = []
    for (const pref of preferences) {
      const category = pref.category
      await findAds(category)
        .then(response => {
          const ads = response.rows
          const randomIndex = (Math.random() * ads.length) >>> 0

          responseAds.push(ads[randomIndex])
        })
    }
    return responseAds
  }
  findAds()
    .then(responseAds => {
      redisClient.set(channelId, JSON.stringify(responseAds), redis.print)
    })
})

if (!module.parent){ 
  app.listen(port, _ => console.log('on 3000'))
}
module.exports = app