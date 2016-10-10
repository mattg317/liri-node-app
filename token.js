var R = require("request");
var newKeys = require('./keys');


var key = newKeys.twitterKeys.consumer_key;
var secret = newKeys.twitterKeys.consumer_secret;
var cat = key +":"+secret;
var credentials = new Buffer(cat).toString('base64');

console.log(key)

var url = 'https://api.twitter.com/oauth2/token';

R({ url: url,
    method:'POST',
    headers: {
        "Authorization": "Basic " + credentials,
        "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: "grant_type=client_credentials"

}, function(err, resp, body) {
	var bodyjson = JSON.parse(body);
	exports.bearer= bodyjson.access_token
    console.dir(bodyjson.access_token); //the bearer token...


});


