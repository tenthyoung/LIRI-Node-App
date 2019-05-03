require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var axios = require("axios");
var moment = require('moment');
var fileSystem = require('fs');
moment().format();

const COMMAND = process.argv[2];
const DETAILS = process.argv.slice(3).join(" ");

switch (COMMAND) {
    case "concert-this":
        findConcerts(DETAILS)
        break;

    case "spotify-this-song":
        findSong(DETAILS);
        break;

    case "movie-this":
        findMovie(DETAILS);
        break;

    case "do-what-it-says":
        readRandomTextFile();
        break;

    default:
        console.log("Sorry, I didn't quite get that.");
}

//====================================================================================//
// Concert This
//====================================================================================//
function findConcerts(artist) {
    const QUERY_URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios
        .get(QUERY_URL)
        .then(function (response) {
            displayConcertEvents(artist, response.data);
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        })
}

function displayConcertEvents(musician, concertDataArray) {
    console.log("Showing the next three concerts of " + musician);
    for (let i = 0 ; i < 3 ; i++) {
        console.table(
            {
                Venue: concertDataArray[i].venue.name,
                Location: concertDataArray[i].venue.city + ", " + concertDataArray[i].venue.region + ", " + concertDataArray[i].venue.country,
                Date: formatConcertTimes(concertDataArray[i].datetime)
            }
        );
    
    }
}   

function formatConcertTimes(dateTime) {
    const T_LOCATION = dateTime.indexOf("T");
    const DATE = moment(dateTime.slice(0,T_LOCATION), "YYYY-MM-DD").format("MM/DD/YYYY");

    return DATE;
}

//====================================================================================//
// Spotify
//====================================================================================//
function findSong(songName) {
    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if ( err ) {
            // console.log('Error occurred: ' + err);
            console.log("Sorry, I can't find what you were looking for, but check this song out?")
            findSong('The Sign by Ace of Base');
            return;
        }
     
        console.table(
            {
                'Song Title': data.tracks.items[0].name,
                'Artist(s)': data.tracks.items[0].artists[0].name,
                Album: data.tracks.items[0].album.name,
                Preview: data.tracks.items[0].preview_QUERY_URL
            }
        );
        // Do something with 'data'
    });
}

//====================================================================================//
// Find Movie
//====================================================================================//

function findMovie(movie) {
    const QUERY_URL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    axios
        .get(QUERY_URL)
        .then(function (response) {
            displayMovie(response.data);
        })
        .catch(function (error) {
            // console.log("I couldn't find that movie, but I would recommend this:");
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        })
}

function displayMovie(movieObj) {
    console.table(
        {
            'Movie Title': movieObj.Title,
            Actors: movieObj.Actors,
            Released: movieObj.Released,
            'IMDB Rating': movieObj.Ratings[0].Value,
            'Rotten Tomatoes': movieObj.Ratings[1].Value,
            Country: movieObj.Country,
            Language: movieObj.Language,
        }
    );
    console.log("Plot: \n" + movieObj.Plot)
}

function readRandomTextFile() {

    fs.readFile("random.txt", "utf8", function(error, file) {
        
        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }
        
        // We will then print the contents of data
        console.log(file);
        
        // Then split it by commas (to make it more readable)
        var dataArr = file.split(",");
        
        // We will then re-display the content as an array for later use.
        console.log(dataArr);
        
    });
    
}