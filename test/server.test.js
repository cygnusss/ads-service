const request = require('supertest')
const app = require('../server')

describe('Server', () => {
  it('Should respond with 200 on the "/" route', (done) => {
    request(app).get('/')
      .expect(200, done)
  })

  it('Should respond with 200 on the "/ads" route', (done) => {
    request(app).get('/ads')
      .expect(200, done)
  })
  
  it('Should respond with 202 status on the "/ads" route', (done) => {
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

describe('Database', () => {
  it('Should respond with 200 on the "/" route', (done) => {
    request(app).get('/')
      .expect(200, done)
  })
})