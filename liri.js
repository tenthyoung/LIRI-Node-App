require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var axios = require("axios");
var moment = require('moment');
moment().format();

const COMMAND = process.argv[2];
const DETAILS = process.argv.slice(3).join(" ");

switch (COMMAND) {
    case "concert-this":
        findConcerts(DETAILS)
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

function findConcerts(artist) {
    const URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios
        .get(URL)
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
    // const TIME = moment(dateTime.slice(T_LOCATION+1,"HH:mm:ss")).format("hh:mm A");
    // console.log(T_LOCATION);
    // console.log(DATE);
    return DATE;
    // console.log(TIME);
    // setTimeout(() => {
    //     console.log((DATE));
    //     // console.log(moment(dateTime,"YYYY-MM-DD-HH:mm"));
    // }, 1000);
}





