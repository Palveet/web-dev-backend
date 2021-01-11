const express = require('express');
const path = require('path');
//initialising app
const app = express();

//load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


//home route
app.get('/', (req, res) => {
    let articles = [{
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

    res.render('index', {
        title: 'day 1',
        quote: "here we go!",
        articles: articles
    });
});

//add route
app.get('/articles/add', (req, res) => {
    res.render('add_article', {
        title: "Add article"
    });

});



//starting server
app.listen(3000, function() {
    console.log('server started on port 3000..');
});