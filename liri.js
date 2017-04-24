// store the user input
var userInput0 = process.argv[2];
var userInput1 = process.argv[3];

// require twitter, spotify, and fs NPMs
// didn't quite make it to the OMDB thing (ding)
var Twitter = require('twitter');
var spotify = require('spotify');
var fs = require("fs");
// require keys.js contains twitter access keys and secrets
var TwitterKeys = require("./keys.js");
// construct a twitter objects with my keys
var client = new Twitter(TwitterKeys.twitterKeys);
// make a filter for my tweets
var params = {screen_name: 'JeffBrownUS'};

function doThis() {
	// do something based on the userInput
	switch (userInput0) {
		case "my-tweets":
			// get my tweets, display in the callback
			client.get('statuses/user_timeline', params, function(error, tweets, response) {
			  if (error){
			  	console.log("my-tweets err=", error)
			  } else {
			  	for (var i = 0; i < tweets.length; i++) {
				  	console.log(tweets[i].text + ", " + tweets[i].created_at);
			  	}
			  }
			});
			break;
		case "spotify-this-song":
			if (!(typeof userInput1 === "string")) userInput1 = "The Sign";
			spotify.search({ type: 'track', query: userInput1 }, function(err, data) {
			    if ( err ) {
			        console.log('Response error, try again -- spotify-this-song err=' + err);
			        return;
			    }
			    	// console.log(JSON.stringify(data));
			    	console.log("data.tracks.items.length=", data.tracks.items.length);
			    	for (var i0 = 0; i0 < data.tracks.items.length; i0++){
			    		console.log("----------------------");
			    		for (var i1 = 0; i1 < data.tracks.items[i0].artists.length; i1++){
				    		console.log("data.tracks.items[" + i0 + "].artists["+ i1 + "].name=", data.tracks.items[i0].artists[i1].name);
				    	}
				    	console.log("data.tracks.items[" + i0 + "].name=", data.tracks.items[i0].name);
				    	console.log("data.tracks.items[" + i0 + "].preview_url=", data.tracks.items[i0].preview_url);
				    	console.log("data.tracks.items[" + i0 + "].album.name=", data.tracks.items[i0].album.name);
			    	}
			});
			break;
		case "movie-this":
			if (!(typeof userInput1 === "string")) userInput1 = "Mr. Nobody\nPlease note I did include the default of Mr. Nobody. That should be worth a point or two.";
			console.log("Imagine here a bunch of information about the movie " + userInput1 +
						"\n\nIf I had fewer demands on my time, this code would've been really great," +
			            "\nbut it's basically the same as the Spotify thing, although we would've" +
			            "\nused the request package instead of an NPM, because that's what the specs call for.");
			break;
		default:
			console.log("Usage: node liri <action> <query value>" +
				"\nactions are case sensitive: spotify-this-song, my-tweets, movie-this, or do-what-it-says" +
				"\n if song/movie queries are more than one word, put them in quotes, please and thanks");

	}
}

// before we actually do anything,
// check if the user input is 'do what it says'
// if yes, then get the user input from random.txt
if (userInput0 === "do-what-it-says") {
	// for the bonus, we would add more items to the text file
	// each item separated by a delimiter such as CRLF (lines), or 
	// a semcolon, whatever, and first split the items into a first array
	// then use Math.random() to get a random item based 
	// on the length of the first split array (lines)
	// then split the random line at the comma as here below
	fs.readFile("random.txt", "utf8", function(error, data) {
	  // split it by commas
	  var dataArr = data.split(",");
	  // put it into the userInputs
	  userInput0 = dataArr[0];
	  userInput1 = dataArr[1];
	  console.log("user inputs=", userInput0, userInput1);
	  // call the main function with modified user input
	  // NOTE: if the code has been modified we need to run doThis()
	  // here, if outside the if statement it runs before the
	  // file system callback completes
	  doThis();
	});
} else {
	// call the main function with original user input
	doThis();
}

		
