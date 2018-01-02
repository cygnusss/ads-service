import request from 'supertest'
import app from '../server'
import cassandra from 'cassandra-driver'
import { findAdsById, insertAds, deleteAd } from '../database_cassandra'
import { redisClient } from '../database_redis'
const expect = require('chai').expect

describe('Server', () => {
  xit('Should respond with 200 on the "/" route', (done) => {
    request(app).get('/')
      .expect(200, done)
  })

  xit('Should respond with 200 on the "/ads" route', (done) => {
    request(app).get('/ads')
      .expect(200, done)
  })
  
  xit('Should respond with 202 status on the "/ads" route', (done) => {
    request(app).post('/ads')
      .send({
        id: "david",
        img: "img",
        siteLink: "siteLink",
        category: "category"
      })
      .expect(202, done)
  })
})

describe('Cassandra', () => {
  const insertionQuery = 'INSERT INTO test.users(id, img, siteLink, category) VALUES(?, ?, ?, ?)'

  const id = '1629bb06aa204e6c'
  const img = 'https://giphy.com/SJusjAu78'
  const siteLink = 'https://giphy.com'
  const category = 'images'

  before((done) => {
    insertAds(id, img, siteLink, category)
      // .then(data => console.log('Ad inserted'))
      .then(() => done())
      .catch(err => done(err))
  })

  after((done) => {
    deleteAd(id)
      // .then(data => console.log('Ad deleted'))
      .then(() => done())
      .catch(err => done(err))
  })

  it('Should return an array containing an object after inserting a row', (done) => {
    findAdsById(id)
      .then((data) => {
        expect(data.rows.length).to.not.equal(0)
        done()
      })
      .catch((err) => done(err))
  })

  it('Rows should have an ID column', (done) => {
    findAdsById(id)
      .then((data) => {
        expect(data.rows[0].id).to.exist
        done()
      })
      .catch((err) => done(err))
  })

  it('Rows should have a Category column', (done) => {
    findAdsById(id)
      .then((data) => {
        expect(data.rows[0].category).to.exist
        done()
      })
      .catch((err) => done(err))
  })

  it('Rows should have an IMG column', (done) => {
    findAdsById(id)
      .then((data) => {
        expect(data.rows[0].img).to.exist
        done()
      })
      .catch((err) => done(err))
  })

  it('Rows should have a SiteLink column', (done) => {
    findAdsById(id)
      .then((data) => {
        expect(data.rows[0].sitelink).to.exist
        done()
      })
      .catch((err) => done(err))
  })
})

describe('Redis', () => {
  const channelId = '1629bb06aa204e6c'
  const ads = [ 
    { id: '747be100-d602-4baa-af78-fff3277e96c7',
      category: 'Comedy',
      img: 'http://www.clinical.ir/oHoSz6/nonpersonal.png',
      sitelink: 'http://www.examinable.kr' },
    { id: '34b2946e-36fd-4ed3-8e82-c9a3ff7ea250',
      category: 'Drama',
      img: 'http://www.subcolleges.gr/I3rbrLhM/clingingness.png',
      sitelink: 'http://www.temporalness.ps' } 
  ]
  
  before((done) => {
    redisClient.setAsync(channelId, JSON.stringify(ads))
      .then(() => done())
      .catch(err => done(err))
  })

  after((done) => {
    redisClient.delAsync(channelId)
      .then(() => done())
      .catch(err => done(err))
  })

  it('Should properly set key:values when inserted', (done) => {
    redisClient.getAsync(channelId)
      .then((resp) => {
        expect(resp).to.exist
        done()
      })
      .catch(err => done(err))
  })

  it('The value of a key should be an array with items', (done) => {
    redisClient.getAsync(channelId)
      .then((resp) => {
        resp = JSON.parse(resp)
        expect(resp).to.be.an('array')
        expect(resp.length).to.not.equal(0)
        done()
      })
      .catch(err => done(err))
  })
})