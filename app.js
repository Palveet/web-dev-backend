var fs = require('fs');

fs.rmdir('stuff', (err) => {
    if (err) console.log(err);
    else console.log('deleted');
});