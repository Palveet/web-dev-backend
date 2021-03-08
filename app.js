var http = require('http');

var server = http.createServer((req, res) => {
    console.log('request was made: ' + req.url);
    res.writeHead(200, {
        'content-Type': 'text/plain'
    });
    res.end('Hey ninjas');
});
var port = 3000;
server.listen(port, '127.0.0.1');

console.log(`listening to port ${port}`);