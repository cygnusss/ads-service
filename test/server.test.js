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
  before((done) => {
    redisClient.
  })
})