const express = require('express')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const app = express()
const cassandra = require('cassandra-driver')

// const redisClient = require('../database_redis/index')
// const tester = require('../database_cassandra/tester')
const cassandraClient = require('../database_cassandra/index')

app.use(bodyParser()

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
  cassandraClient.execute(insertUsers, [id, img, siteLink, category], (err, result) => {
    if (err) console.error(err)
    else {
      resp
        .status(202)
        .end()
    }
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
  const preferences = req.categories

  for (const pref of preferences) {
    cassandraClient.execute(`SELECT * FROM test.users WHERE category = '${pref.category}'`);
  }
})

if(!module.parent){ 
  app.listen(port, _ => console.log('on 3000'))
}
module.exports = app