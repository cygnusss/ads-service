const express = require('express')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const app = express()
const cassandra = require('cassandra-driver')
// const client = require('../database_redis/index')
// const tester = require('../database_cassandra/tester')
const client = require('../database_cassandra/index')

app.use(bodyParser());

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

  const insertUsers = 'INSERT INTO test.users(id, img, siteLink, category) VALUES(?, ?, ?, ?)'
  client.execute(insertUsers, [id, img, siteLink, category], (err, result) => {
    if (err) console.error(err);
    else {
      resp
        .status(202)
        .end()
    }
  })
})

app.post('/events', (req, resp) => {
})

if(!module.parent){ 
  app.listen(port, _ => console.log('on 3000'))
}
module.exports = app