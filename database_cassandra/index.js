const Promise = require('bluebird');
const fs = require('fs');
const cassandra = require('cassandra-driver');
const getFakeAd = require('../faker/script');
const json2csv = require('json2csv');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1']
});
client.connect()
  .then(_ => console.log('connected to cassandra'))
  .catch(err => console.error('timeout bruh'));

// client.execute('SELECT COUNT(*) FROM test.users')
//   .then(res => console.log(res))
//   .catch(err => console.error('timeout bruh'));


// const addTenFiveThousand = () => {
//   let i = 0; do {
//     id = cassandra.types.uuid();
//     const fakeAd = getFakeAd();
//     const category = fakeAd.category;
//     const img = fakeAd.img;
//     const siteLink = fakeAd.siteLink;
//     const fields = [id, category, img, siteLink];
//     const file = json2csv({fields}) + '\n';
    
//     fs.appendFile('test_TEN.csv', file, err => {
//       if (err) throw err;
//       console.log('The file has been saved!');
//     });

//     ++i;
//   } while (i <= 5000);
// };

// let i = 0; setInterval(function() {
//   if (i <= 180) {
//     console.log('Insertion number:', i);
//     addTenFiveThousand();
//   } 
//   else { console.log('1,000,000 records loaded'); }
//   i++
// }, 1000);

/* WRITE DIRECTLY INTO THE DB */
// const insertUsers = 'INSERT INTO test.users(id, img, siteLink, category) VALUES(?, ?, ?, ?)';
// client.execute(insertUsers, [id, img, siteLink, category], (err, res) => {
//   if (err) throw err;
//   else {
//     console.log('User Added');
//     console.log({
//       id,
//       img,
//       siteLink,
//       category
//     })
//   };
// });

module.exports = client;