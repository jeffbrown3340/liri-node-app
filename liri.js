// store the user input
var userInput0 = process.argv[2];
var userInput1 = process.argv[3];

// require Twitter NPM
var Twitter = require('twitter');
// require keys.js contains twitter access keys and secrets
var TwitterKeys = require("./keys.js");
// construct a twitter objects with my keys
var client = new Twitter(TwitterKeys.twitterKeys);
// make a filter for my tweets
var params = {screen_name: 'JeffBrownUS'};

// do something based on the userInput
switch (userInput0) {
	case "my-tweets":
		// get my tweets, display in the callback
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
		  if (error){
		  	console.log("err=", error)
		  } else {
		  	for (var i = 0; i < tweets.length; i++) {
			  	console.log(tweets[i].text + ", " + tweets[i].created_at);
		  	}
		  }
		});
		break;
	case "spotify-this-song":
		console.log("spotify-this-song");
		console.log("song name = ", userInput1);
		break;
	case "movie-this":
		console.log("movie-this");
		console.log("movie-name = ", userInput1);
		break;
	case "do-what-it-says":
		console.log("do-what-it-says");
		break;

}
