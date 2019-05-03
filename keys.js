// require("dotenv").config();

// console.log('this is loaded');

// exports.spotify = {
//     id: process.env.SPOTIFY_ID,
//     secret: process.env.SPOTIFY_SECRET
// };

const db = require('./.env')
db.connect({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
})

const result = dotenv.config()
 
if (result.error) {
  throw result.error
}
 
console.log(result.parsed)