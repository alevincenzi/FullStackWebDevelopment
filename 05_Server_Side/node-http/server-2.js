var http = require('http');
var fs   = require('fs');
var path = require('path');
var util = require('util');

var hostname = 'localhost';
var port = 3000;

var pageNotFound =
	'<html><body>'+
		'<h1>Error 404: %s not found</h1>'+
	'</body></html>';
	
var notHtmlFile = 
	'<html><body>'+
		'<h1>Error 404: %s not a HTML file</h1>'+
	'</body></html>';
	
var methodNotSupported =
	'<html><body>'+
		'<h1>Error 404: %s not supported</h1>'+
	'</body></html>'

var server = http.createServer(

	function(req, res){
  
		console.log('Request for ' + req.url + ' by method ' + req.method);
  
		res.writeHead(404, { 'Content-Type': 'text/html' });
  
		if (req.method != 'GET') {
			res.end(util.format(methodNotSupported, req.method));	
			return;
		}
			
		var fileUrl;
			
		if (req.url == '/')
			fileUrl = '/index.html';
		else
			fileUrl = req.url;
			
		var filePath = path.resolve('./public'+fileUrl);
		var fileExt = path.extname(filePath);
			
		if (fileExt != '.html') {
			res.end(util.format(notHtmlFile, fileUrl));			
			return;
		}
			
		fs.exists(filePath,
				
			function(exists) {
						
				if (!exists) {
					res.end(util.format(pageNotFound, fileUrl));
					return;
				}
				
				fs.createReadStream(filePath).pipe(res);
			}
		);
	}
);

server.listen(port, hostname,
	
	function(){
		console.log(`Server running at http://${hostname}:${port}/`);
	}
);