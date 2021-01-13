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
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


//set public folder
app.use(express.static(path.join(__dirname, 'public')));

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


//get single article

app.get('/article/:id', (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        res.render('article', {
            article: article
        });

    });
});

//edit

app.get('/article/edit/:id', (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        res.render('edit_article', {
            title: "edit article",
            article: article
        });

    });
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


//update submit
app.post('/articles/edit/:id', function(req, res) {
    let article = {};
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    let query = { _id: req.params.id }

    Article.updateOne(query, article, function(err) {
        if (err) {
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    });

});

app.delete('/article/:id', function(req, res) {

    let query = { _id: req.params.id }
    Article.remove(query, function(err) {
        if (err) {
            console.log(err);
        }
        res.send('success');
    });
});


//starting server
app.listen(3000, function() {
    console.log('server started on port 3000..');
});