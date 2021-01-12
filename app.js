const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/express');

let db = mongoose.connection;

//check conn
db.once('open', () => {
    console.log('connected');
});
//check for db errors
db.on('error', (err) => {
    console.log(err);
});
//initialising app
const app = express();


//bring model

let Article = require('./models/article');


//load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



//home route
app.get('/', (req, res) => {

    Article.find({}, (err, articles) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {
                title: 'Articles',
                articles: articles
            });
        }

    });
    /* let articles = [{
            id: 1,
            title: 'article 1',
            author: 'palveet',
            body: 'this is article 1'
        },
        {
            id: 1,
            title: 'article 2',
            author: 'palveet',
            body: 'this is article 2'
        },
        {
            id: 1,
            title: 'article 3',
            author: 'palveet',
            body: 'this is article 3'
        }
    ]
*/
});

//add route
app.get('/articles/add', (req, res) => {
    res.render('add_article', {
        title: "Add article"
    });

});

//add submit post route
app.post('/articles/add', function(req, res) {
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save((err) => {
        if (err) {
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    });

});


//starting server
app.listen(3000, function() {
    console.log('server started on port 3000..');
});