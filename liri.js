var Twitter = require('twitter');
var TwitterKeys = require("./keys.js");
 
console.log(TwitterKeys.twitterKeys);


// var client = new Twitter({
//   consumer_key: '',
//   consumer_secret: '',
//   access_token_key: '',
//   access_token_secret: ''
// });

var client = new Twitter(TwitterKeys.twitterKeys);

var params = {screen_name: 'JeffBrownUS'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});