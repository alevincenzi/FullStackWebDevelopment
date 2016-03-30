var http = require('http');

var hostname = 'localhost';
var port = 3000;

var pageContent =
	
	'<html><body>'+
		'<h1>Hello World</h1>'+
	'</body></html>';

var server = http.createServer(
	
	function(req, res){
  
		console.log(req.headers);
  
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(pageContent);
	}
);

server.listen(port, hostname,
	
	function(){
		console.log(`Server running at http://${hostname}:${port}/`);
	}
);