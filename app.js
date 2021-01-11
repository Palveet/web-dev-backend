const express = require('express');
const path = require('path');
//initialising app
const app = express();

//load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//home route
app.get('/', (req, res) => {
    res.render('index');
});

//starting server
app.listen(3000, function() {
    console.log('server started on port 3000..');
});