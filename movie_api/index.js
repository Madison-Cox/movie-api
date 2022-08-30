const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser'),
    uuid = require('uuid');
const app = express();

app.use(bodyParser.json());

app.use(express.static('public'));

app.use(morgan('common'));

let users = [
    {
        id: 1,
        name: 'Josh',
        favoriteMovies: []
    },
    {
        id: 2,
        name: 'Savannah',
        favoriteMovies: ['Interstaller']
    }
];
let movies = [
    {
        title: 'Good Will Hunting',
        Director: {
            Name: 'Gus Van Sant',
            descriptions:''
        },
        stars: 'Robin Williams, Matt Damon, Ben Affleck',
        Genre: {
            name:'Drama',
            description:''
        }
    },
    {
        title: 'Interstellar',
        Director: {
            Name:'Christopher Nolan',
            description:''
        },
        stars: 'Matthew McConaughey, Anne Hathaway, Jessica Chastain',
        Genre: {
            name: 'Adventure, Sci-Fi',
            description:''
        }
    },
    {
        title: 'Top Gun',
        Director: {
            Name: 'Tony Scott',
            description:''
        },
        stars: 'Tom Cruise, Tim Robbins, Kelly McGillis',
        Genre: {
            name: 'Action',
            description:''
        }
    },
    {
        title: 'Dazed and Confused',
        Director: {
            Name: 'Richard Linklater',
            description:''
        },
        stars: 'Jason London, Wiley Wiggins, Matthew McConaughey',
        Genre: {
            name: 'Comedy',
            description:''
        }
    },
    {
        title: 'Star Wars',
        Director: {
            Name: 'George Lucas',
            description:''
        },
        stars: 'Mark hamill, Harrison Ford, Carrie Fisher',
        Genre: {
            name:'Sci-Fi',
            description:''
        }
    },
    {
        title: 'Hook',
        Director: {
            Name: 'Steven Spielberg',
            description:''
        },
        stars: 'Dustin Hoffman, Robin Williams, Julia Roberts',
        Genre: {
            name:'Adventure',
            description:''
        }
    },
    {
        title: 'Back to the Future',
        Director: {
            Name: 'Robert Zemeckis',
            description:''
        },
        stars: 'Michael J. Fox, Christopher Lloyd, Lea Thompson',
        Genre: {
            name:'Adventure, Comedy, Sci-Fi',
            description:''
        }
    },
    {
        title: 'Saving Private Ryan',
        Director: {
            Name: 'Steven Spielberg'
        },
        stars: 'Tom Hanks, Matt Damon, Tom Sizemore',
        Genre: {
            name:'Action',
            description:''
        }
    },
    {
        title: 'Jurassic Park',
        Director: {
            Name: 'Steven Spielberg'
        },
        stars: 'Sam Neill, Laura Dern, Jeff Goldblum',
        Genre: {
            name:'Action, Adventure',
            description:''
        }
    },
    {
        title: 'GoodFellas',
        Director: {
            Name: 'Martin Scorsese'
        },
        stars: 'Robert De Niro, Ray Liotta, Joe Pesci',
        Genre: {
            name:'Drama, Biography, Crime',
            description:''
        }
    }
];

//CREATE
app.post('/users', (req, res) => {
    const newUser = req.body;
    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser)
    } else {
        res.status(400).send('users need names')
    }
})
//UPDATE
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find( user => user.id == id);

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send('')
    }
})

//CREATE
app.post('/users/:id/:movietitle', (req, res) => {
    const { id, movietitle } = req.params;

    let user = users.find( user => user.id == id);

    if (user) {
        user.favoriteMovies.push(movietitle);
        res.status(200).send(`${movietitle} has been added to user ${id}'s array`);
    } else {
        res.status(400).send('')
    }
})
//DELETE
app.delete('/users/:id/:movietitle/', (req, res) => {
    const { id, movietitle } = req.params;

    let user = users.find( user => user.id == id);

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter( title => title !== movietitle);
        res.status(200).send(`${movietitle} has been removed from user ${id}'s array`);;
    } else {
        res.status(400).send('')
    }
})
//DELETE
app.delete('/users/:id/', (req, res) => {
    const { id } = req.params;

    let user = users.find( user => user.id == id);

    if (user) {
        users = users.filter( user => user.id != id);
        res.status(200).send(`user ${id} has been deleted`);
    } else {
        res.status(400).send('')
    }
})
//READ
app.get('/', (req, res) => {
    res.send('This is MovieScout');
});

//READ
app.get('/movies', (req, res) => {
    res.status(200).json(movies)
});

//READ
app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find(movie => movie.title === title);

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('movie not found')
    }
});

//READ
app.get('/movies/Genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find(movie => movie.Genre.name === genreName).Genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('Genre not found')
    }
});

//READ
app.get('/movies/director/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find (movie => movie.Director.Name === directorName).Director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('Director not found')
    }
});

app.listen(5285, () => {
    console.log('listening on port 5285');
});
