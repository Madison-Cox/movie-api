const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.static('public'));
app.use(morgan('common'));

let topMovies = [
    {
        title: 'Good Will Hunting',
        director: 'Gus Van Sant',
        stars: 'Robin Williams, Matt Damon, Ben Affleck'
    },
    {
        title: 'Interstellar',
        director: 'Christopher Nolan',
        stars: 'Matthew McConaughey, Anne Hathaway, Jessica Chastain'
    },
    {
        title: 'Top Gun',
        director: 'Tony Scott',
        stars: 'Tom Cruise, Tim Robbins, Kelly McGillis'
    },
    {
        title: 'Dazed and Confused',
        director: 'Richard Linklater',
        stars: 'Jason London, Wiley Wiggins, Matthew McConaughey'
    },
    {
        title: 'Star Wars',
        director: 'George Lucas',
        stars: 'Mark hamill, Harrison Ford, Carrie Fisher'
    },
    {
        title: 'Hook',
        director: 'Steven Spielberg',
        stars: 'Dustin Hoffman, Robin Williams, Julia Roberts'
    },
    {
        title: 'Back to the Future',
        director: 'Robert Zemeckis',
        stars: 'Michael J. Fox, Christopher Lloyd, Lea Thompson'
    },
    {
        title: 'Saving Private Ryan',
        director: 'Steven Spielberg',
        stars: 'Tom Hanks, Matt Damon, Tom Sizemore'
    },
    {
        title: 'Jurassic Park',
        director: 'Steven Spielberg',
        stars: 'Sam Neill, Laura Dern, Jeff Goldblum'
    },
    {
        title: 'GoodFellas',
        director: 'Martin Scorsese',
        stars: 'Robert De Niro, Ray Liotta, Joe Pesci'
    }
];

app.get('/', (req, res) => {
    res.send('This is MovieScout');
});

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('Something Broke');
});

app.listen(5285, () => {
    console.log('listening on port 5285');
});
