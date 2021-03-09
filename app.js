var http = require('http');
var fs = require('fs');


var server = http.createServer((req, res) => {
    console.log('request was made: ' + req.url);
    res.writeHead(200, {
        'content-Type': 'text/html'
    });
    var myReadStream = fs.createReadStream(__dirname + '/index.html', 'utf8');
    myReadStream.pipe(res);
});
var port = 3000;
server.listen(port, '127.0.0.1');

console.log(`listening to port ${port}`);