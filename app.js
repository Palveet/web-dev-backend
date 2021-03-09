var http = require('http');
var fs = require('fs');

fs.writeFile('readMe.txt', `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed massa est, sollicitudin nec metus quis, dictum malesuada ipsum. In at sapien consequat, ornare felis sit amet, consequat ex. Proin sit amet dui eget odio efficitur finibus. Suspendisse aliquam aliquet semper. Duis mauris turpis, aliquam ac risus a, congue tincidunt nunc. Nam lacus erat, mattis ut eros id, aliquet ullamcorper libero. Suspendisse pulvinar neque ut mi feugiat, non efficitur risus pharetra.

Vestibulum eleifend turpis mauris, ut eleifend nisl malesuada sed. Sed eleifend ex eget eros dapibus ullamcorper. Vivamus elit lorem, commodo et elit luctus, maximus mattis massa. Sed id odio nibh. Nullam mollis bibendum efficitur. Praesent odio leo, venenatis quis cursus vel, hendrerit et elit. Donec luctus sem at lacus bibendum tincidunt.

Nulla dapibus et lorem vel convallis. Praesent id molestie lacus. Sed finibus, urna sit amet porttitor euismod, elit lacus sagittis magna, vel vulputate enim diam a elit. Maecenas lobortis, erat sed dignissim sollicitudin, ante odio tempus ipsum, in ornare arcu ante ac purus. Nam tempus cursus feugiat. Curabitur id elit neque. In hac habitasse platea dictumst. Suspendisse condimentum urna facilisis eros aliquam ullamcorper. Morbi vitae ullamcorper lorem, a posuere orci. Pellentesque sit amet mauris ante. Phasellus nec nisl maximus, venenatis purus vitae, ultricies magna. Mauris a fermentum diam. Sed in suscipit libero. Nunc lacinia dictum arcu vitae fermentum. Phasellus tempor volutpat diam a ornare. Duis sodales fringilla lacus quis ultrices.

Vivamus maximus vitae erat sed rutrum. Suspendisse cursus, eros non iaculis maximus, lorem felis lobortis metus, sed pellentesque eros libero nec purus. Sed vel lorem sit amet mi dictum eleifend. Nullam ultricies orci ullamcorper, viverra turpis nec, congue turpis. Praesent imperdiet, nunc eget dictum gravida, mi nunc interdum sapien, nec accumsan ipsum felis vitae odio. Aenean non porttitor quam. Quisque mauris velit, lobortis eget mauris a, porta auctor risus.

Sed eleifend, lorem in tristique lobortis, nibh metus ultrices nunc, id efficitur dui felis ut orci. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis faucibus, ligula vitae bibendum pharetra, elit dolor varius odio, id elementum leo est et sem. Morbi volutpat pharetra libero, vitae varius enim blandit in. Vestibulum sed neque eu orci congue malesuada ut a metus. Ut risus nulla, venenatis eu turpis eget, hendrerit tristique odio. Donec et diam in leo accumsan eleifend. Vivamus scelerisque odio a ornare auctor. Phasellus tortor purus, placerat quis feugiat quis, euismod quis justo. Duis maximus vitae mauris vel vehicula. Nunc elementum dui eget tellus blandit tempus. Sed vestibulum eros sit amet mi condimentum, vel viverra tortor vulputate. Nullam eu malesuada tellus.`, (err, data) => {
    if (err) console.log(err);
    else console.log('written');
});

var myReadStream = fs.createReadStream(__dirname + '/readMe.txt', 'utf8');

var myWriteStream = fs.createWriteStream(__dirname + '/writeMe.txt');

myReadStream.on('data', (chunk) => {
    console.log('new chunk received: ');
    myWriteStream.write(chunk);
})










/*var server = http.createServer((req, res) => {
    console.log('request was made: ' + req.url);
    res.writeHead(200, {
        'content-Type': 'text/plain'
    });
    res.end('Hey ninjas');
});
var port = 3000;
server.listen(port, '127.0.0.1');

console.log(`listening to port ${port}`);*/