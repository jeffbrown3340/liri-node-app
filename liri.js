// require Twitter NPM
var Twitter = require('twitter');
// require keys.js contains twitter access keys and secrets
var TwitterKeys = require("./keys.js");
// construct a twitter objects with my keys
var client = new Twitter(TwitterKeys.twitterKeys);
// make a filter for my tweets
var params = {screen_name: 'JeffBrownUS'};
// get my tweets
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (error){
  	console.log("err=", error)
  } else {
  	for (var i = 0; i < tweets.length; i++) {
	  	console.log(tweets[i].text);
  	}
  }
});