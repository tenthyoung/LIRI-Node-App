// require("dotenv").config();

// var keys = require("./keys.js");

// var Spotify = require('node-spotify-api');
// var spotify = new Spotify(keys.spotify);

let command = process.argv[2];

switch (command) {
    case "concert-this":
      console.log("concert");
      break;
    
    case "spotify-this-song":
      console.log("spotiffy");
      break;
    
    case "movie-this":
      console.log("moviee time");
      break;
    
    case "do-what-it-says":
      console.log("Do what it says");
      break;

    default:
      console.log("Sorry, I didn't quite get that.");
}







