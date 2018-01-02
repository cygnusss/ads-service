import express from 'express'
import bodyParser from 'body-parser'
import cassandra from 'cassandra-driver'
import { redis, redisClient } from '../database_redis/index'
import { cassandraClient, insertAds, findAds } from '../database_cassandra/index'

const port = process.env.PORT || 3000
export const app = express()

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
      resp.status(202).end()
    })
    .catch(err => {
      throw err
    })
})

if (!module.parent){ 
  app.listen(port, _ => console.log('on 3000'))
}