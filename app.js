var fs = require('fs');

//async
fs.readFile('read.txt', 'utf8', function(err, data) {
    console.log(data);
});

fs.writeFileSync('write.txt', 'hello');