var R = require("request");
var keys = require('./keys');


var key = keys.twitterKeys.consumer_key;
var secret = keys.twitterKeys.consumer_secret;
var cat = key +":"+secret;
var credentials = new Buffer(cat).toString('base64');

console.log(cat);
console.log('-----------')
console.log(credentials);

var url = 'https://api.twitter.com/oauth2/token';

R({ url: url,
    method:'POST',
    headers: {
        "Authorization": "Basic " + credentials,
        "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: "grant_type=client_credentials"

}, function(err, resp, body) {

    console.dir(body); //the bearer token...

});


