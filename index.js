//IMPORT DEPENDENCIES
const cheerio = require('cheerio');
const express = require('express');
const https = require('https');

const quotesData = require('./quotes/quotes.json');
const quotesArray = quotesData.quotes;

//Define PORT
const PORT = process.env.PORT || 8000;

//Initialize express
const app = express();


//GET Random quote
app.get('/api/quotes', (req, res, next) => {
    console.log(req);
    res.send(quotesArray);
});

//GET Quote Searched
app.get('/api/quotes/search', (req, res, next) => {
    const { quote, movie, actor, character } = req.query;
    let results = quotesArray;
    if (quote) {
        results = results.filter(q => q.quote.toLowerCase().includes(quote.toLowerCase()));
    }
    if (movie) {
        results = results.filter(q => q.movie.toLowerCase() === movie.toLowerCase());
    }
    if (actor) {
        results = results.filter(q => q.actor.toLowerCase() === actor.toLowerCase());
    }
    if (character) {
        results = results.filter(q => q.character.toLowerCase() === character.toLowerCase());
    }

    if (results.length > 0) {
        res.status(200).json(results);
    } else {
        res.status(404).json({ message: 'No quotes found for the given search criteria.' });
    }
});



app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});




