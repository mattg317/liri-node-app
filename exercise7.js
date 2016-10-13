var url = process.argv[2]

http.get(url, function(res){
	console.log("got response: "+ res.statusCode);
}).on('error', function(e){
	console.log('Gor error: '+ e.message);
})