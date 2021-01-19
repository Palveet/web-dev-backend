const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');


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
app.use(express.static(path.join(__dirname, 'public ')));


//session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

//message middleware
app.use(require('connect-flash')());
app.use(function(req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

//validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));


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
            req.flash('success', 'article added');
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
            req.flash("danger", 'Article Updated');
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