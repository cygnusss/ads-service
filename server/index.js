const express = require('express');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const app = express();
// const client = require('../database_redis/index');
const tester = require('../database_cassandra/tester');
const client = require('../database_cassandra/index');

app.use(bodyParser());

app.get('/ads', (req, resp) => {
  // TO BE CONTINUETDED
  console.log('SERVING ADS')
});

app.post('/ads', (req, resp) => {
  const id = req.id;
  const img = req.img;
  const siteLink = req.siteLink;
  const category = req.category;

  const insertUsers = 'INSERT INTO test.users(id, img, siteLink, category) VALUES(?, ?, ?, ?)';
  client.execute(insertUsers, [id, img, siteLink, category])
    .then(result => {
      console.log("INSERTED INTO THE DB");
      console.log(result)
      resp
        .status(202)
        .end();
    })
    .catch(err => {
      resp
        .status(404)
        .end();
    });
});

app.post('/events', (req, resp) => {
  // TO BE CONTINUETDED
});

app.listen(port, _ => {
  console.log('listening on', port);
});