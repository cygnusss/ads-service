const axios = require('axios');

data = {
  id: 'david',
  img: 'noimg',
  siteLink: 'nositelink',
  category: 'movie'
}

axios.post('ads', data)
  .then(_ => console.log("POSTED DATA HAHA"));