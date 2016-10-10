
var request = require('request');
var Twitter = require('twitter');
var spotify = require('spotify');
var inquirer = require('inquirer');
var fs = require('fs');
var keys = require('./keys');



// console.log("BEar key "+ keys.bear_token)
// console.log(.log(keys.twitterKeys.access_token_key)

var commands = ['my-tweets', 'spotify-this-song', 'movie-this', 'do-what-its-says'];


var client = new Twitter({
	consumer_key: keys.twitterKeys.consumer_key,
	consumer_secret: keys.twitterKeys.consumer_secret,
	access_token_key: keys.twitterKeys.access_token_key,
	access_token_secret: keys.twitterKeys.access_token_secret,

});
// console.log(client);
var params = {screen_name: 'rolemodel15'};
	client.get('statuses/user_timeline',params, function(error, tweets, response){
		if(!error){
			for(var i=0; i<20; i++){
				console.log(tweets[i].text);
				console.log('--------');
			}
		}
		// console.log(response);
	});

//Spotify function=============================================================================

function playSpotify(song){

	spotify.search({type:'track', query: song}, function(err, data){
				if(err){
					console.log('error occurred: '+err);
					return;
				}
				console.log("start")
				console.log('Artist:',data.tracks.items[0].artists[0].name);
				console.log('Song:',data.tracks.items[0].name);
				console.log('Preview Link:',data.tracks.items[0].preview_url)
				console.log('Album:', data.tracks.items[1].album.name)

			})

}

//Moive function=======================================================================================

function movieLookUp(movieName){
 var queryUrl ='http://www.omdbapi.com/?t=' + movieName +'&y=&plot=short&tomatoes=true&r=json';

		console.log(queryUrl);

		request(queryUrl, function(error, response, body){
			if(!error && response.statusCode == 200){

				console.log('Title: ',JSON.parse(body)['Title']);
				console.log('Release Year-',JSON.parse(body)['Released']);
				console.log('IMDB Rating-', JSON.parse(body)['imdbRating']);
				console.log('Country of Production-', JSON.parse(body)["Country"]);
				console.log('Language-',JSON.parse(body)['Language']+'\n');
				console.log('Plot',JSON.parse(body)['Plot']+'\n');
				console.log('Actors',JSON.parse(body)['Actors']);
				console.log('Rotten Tomatoes Rating',JSON.parse(body)['tomatoMeter']);
				console.log('Rotten tomatoes URL', JSON.parse(body)['tomatoURL']);

			}
		});
}

//Spotify===================================================================================
if(process.argv[2]=== 'spotify'){

	playSpotify("What's my age again");
};


// //Movie Request============
if(process.argv[2]=='movie'){

	movieLookUp('Friday Night Lights')

	};

if(process.argv[2]=='says'){

	fs.readFile('random.txt', 'utf8', function(error, data){

		if(error){
			return console.log(error);
		}
		console.log(data);
	})

}

if(process.argv[2]== 'tweet'){
	tweet();
}
