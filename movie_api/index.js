const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser'),
    uuid = require('uuid');
const app = express();
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

mongoose.connect('mongodb: //localhost: 27017/MovieScout', { useNewUrlParser: true, useUnifiedTopology: true });

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
        Description:'Will Hunting, a janitor at M.I.T., has a gift for mathematics, but needs help from a psychologist to find direction in his life.',
        Director: {
            Name: 'Gus Van Sant',
            Bio:'an American film director, producer, photographer and musician. He has earned acclaim as both an independent and mainstream filmmaker.',
            Birth:'July 24, 1952',
            Death:'',
        },
        stars: 'Robin Williams, Matt Damon, Ben Affleck',
        Genre: {
            name:'Drama',
            description:'drama is a category or genre of narrative fiction intended to be more serious than humorous in tone.'
        }
    },
    {
        title: 'Interstellar',
        Description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
        Director: {
            Name:'Christopher Nolan',
            Bio:'Christopher Nolan CBE is a British-American film director, producer, and screenwriter. His films have grossed more than US$5 billion worldwide and have garnered 11 Academy Awards from 36 nominations. Born and raised in London, Nolan developed an interest in filmmaking from a young age.',
            Birth:'July 30, 1970',
            Death:'',
        },
        stars: 'Matthew McConaughey, Anne Hathaway, Jessica Chastain',
        Genre: {
            name: 'Adventure',
            description:'a genre that revolves around the conquests and explorations of a protagonist.'
        }
    },
    {
        title: 'Top Gun',
        Description: 'As students at the United States Navy\'s elite fighter weapons school compete to be best in the class, one daring young pilot learns a few things from a civilian instructor that are not taught in the classroom.',
        Director: {
            Name: 'Tony Scott',
            Bio:'Anthony David Leighton Scott was an English film director and producer. He was known for directing highly successful action and thriller films such as Top Gun, Beverly Hills Cop II, Days of Thunder, The Last Boy Scout, True Romance, Crimson Tide, Enemy of the State, Man on Fire, Déjà Vu, and Unstoppable.',
            Birth:'June 21, 1944',
            Death:'August 19, 2012',
        },
        stars: 'Tom Cruise, Tim Robbins, Kelly McGillis',
        Genre: {
            name: 'Action',
            description:'a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats.'
        }
    },
    {
        title: 'Dazed and Confused',
        Description: 'The adventures of high school and junior high students on the last day of school in May 1976.',
        Director: {
            Name: 'Richard Linklater',
            Bio:'an American film director, producer, and screenwriter. He is known for films that revolve mainly around suburban culture and the effects of the passage of time.',
            Birth:'July 30, 1960',
            Death:'',
        },
        stars: 'Jason London, Wiley Wiggins, Matthew McConaughey',
        Genre: {
            name: 'Comedy',
            description:'a genre of fiction that consists of discourses or works intended to be humorous or amusing by inducing laughter.'
        }
    },
    {
        title: 'Star Wars',
        Description: 'Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire\'s world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.',
        Director: {
            Name: 'George Lucas',
            Bio:'George Walton Lucas Jr. is an American film director, producer, screenwriter, and entrepreneur. Lucas is best known for creating the Star Wars and Indiana Jones franchises and founding Lucasfilm, LucasArts, and Industrial Light & Magic.',
            Birth:'May 14, 1944',
            Death:'',
        },
        stars: 'Mark hamill, Harrison Ford, Carrie Fisher',
        Genre: {
            name:'Sci-Fi',
            description:'uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, interstellar travel or other technologies.'
        }
    },
    {
        title: 'Hook',
        Description: 'When Captain James Hook kidnaps his children, an adult Peter Pan must return to Neverland and reclaim his youthful spirit in order to challenge his old enemy.',
        Director: {
            Name: 'Steven Spielberg',
            Bio:'Steven Allan Spielberg is an American film director, producer, and screenwriter. A figure of the New Hollywood era, he is the most commercially successful director of all time.',
            Birth:'December 18, 1946',
            Death:'',
        },
        stars: 'Dustin Hoffman, Robin Williams, Julia Roberts',
        Genre: {
            name:'Adventure',
            description:'a genre that revolves around the conquests and explorations of a protagonist.'
        }
    },
    {
        title: 'Back to the Future',
        Description: 'Marty McFly, a 17-year-old high school student, is accidentally sent 30 years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.',
        Director: {
            Name: 'Robert Zemeckis',
            Bio:'Robert Lee Zemeckis is an American filmmaker. He first came to public attention as the director of the action-adventure romantic comedy Romancing the Stone, the science-fiction comedy Back to the Future film trilogy, and the live-action/animated comedy Who Framed Roger Rabbit.',
            Birth:'May 14, 1951',
            Death:'',
        },
        stars: 'Michael J. Fox, Christopher Lloyd, Lea Thompson',
        Genre: {
            name:'Adventure',
            description:'a genre that revolves around the conquests and explorations of a protagonist.'
        }
    },
    {
        title: 'Saving Private Ryan',
        Description: 'Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.',
        Director: {
            Name: 'Steven Spielberg',
            Bio:'Steven Allan Spielberg is an American film director, producer, and screenwriter. A figure of the New Hollywood era, he is the most commercially successful director of all time.',
            Birth:'December 18, 1946',
            Death:'',
        },
        stars: 'Tom Hanks, Matt Damon, Tom Sizemore',
        Genre: {
            name:'Action',
            description:'a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats.'
        }
    },
    {
        title: 'Jurassic Park',
        Description: 'A pragmatic paleontologist touring an almost complete theme park on an island in Central America is tasked with protecting a couple of kids after a power failure causes the park\'s cloned dinosaurs to run loose.',
        Director: {
            Name: 'Steven Spielberg',
            Bio:'Steven Allan Spielberg is an American film director, producer, and screenwriter. A figure of the New Hollywood era, he is the most commercially successful director of all time.',
            Birth:'December 18, 1946',
            Death:'',
        },
        stars: 'Sam Neill, Laura Dern, Jeff Goldblum',
        Genre: {
            name:'Adventure',
            description:'a genre that revolves around the conquests and explorations of a protagonist.'
        }
    },
    {
        title: 'GoodFellas',
        Description: 'The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.',
        Director: {
            Name: 'Martin Scorsese',
            Bio:'Martin Charles Scorsese is an American film director, producer, screenwriter and actor. He is the recipient of many accolades, including an Academy Award, three Primetime Emmy Awards, a Grammy Award, four British Academy Film Awards, three Golden Globe Awards, and two Directors Guild of America Awards.',
            Birth:'November 17, 1942',
            Death:'',
        },
        stars: 'Robert De Niro, Ray Liotta, Joe Pesci',
        Genre: {
            name:'Crime',
            description:'a film genre inspired by and analogous to the crime fiction literary genre.'
        }
    }
];

// CREATE A NEW USER
app.post('/users', (req, res) => {
    Users.findOne({ Username: req.body.Username})
    .then((user) => {
        if (user) {
            return res.status(400).send(req.body.Username + 'already exists');
        } else {
            Users
            .create({
                Username: req.body.Username,
                Password: req.body.Password,
                Email: req.body.Email,
                Birthday: req.body.Birthday
            })
            .then((user) =>{req.status(201).json(user) })
            .catch((error) => {
                console.error(error);
                res.status(500).send('Error: ' + error);
            })
        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
    });
});

//CREATE ADD A MOVIE TO USERS FAVORITES
app.post('/users/:Username/movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
        $push: { FavoriteMovies: req.params.MovieID }
    },
    { new: true },
    (err, updatedUser) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        } else {
            res.json(UpdatedUser);
        }
    });
});

//READ ABOUT APP
app.get('/', (req, res) => {
    res.send('This is MovieScout');
});

//READ GETS ALL MOVIES
app.get('/movies', (req, res) => {
    res.status(200).json(movies)
});

//READ GET ALL USERS
app.get('/users', (req, res) => {
    Users.find()
    .then((users) => {
        res.status(201).json(users);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//READ GET USER BY USERNAME
app.get('/users/:Username', (req, res) => {
    Users.findOne({ Username: req.params.Username })
    .then((user) => {
        res.json(user);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//READ FIND MOVIE BY TITLE
app.get('/movies/:title'), (req, res) => {
    Movies.findOne({ title: req.params.title })
    .then((movie) => {
        res.json(movie);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
};

//READ FIND MOVIES BY GENRE
app.get('/movies/:genre'), (req, res) => {
    Movies.findOne({ title: req.params.genre })
    .then((genre) => {
        res.json(genre);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
};

//READ DATA ABOUT GENRE
app.get('/movies/:genre/genreName'), (req, res) => {
    Movies.findOne({ title: req.params.genre.name })
    .then((genre) => {
        res.json(genre);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
};

//READ FIND DIRECTOR
app.get('/movies/:director/directorName'), (req, res) => {
    Movies.findOne({ director: req.params.director.name })
    .then((director) => {
        res.json(director);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
};

//UPDATE PUT USER INFORMATION
app.put('/users/:Username', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
    }
},
{ new: true },
(err, updatedUser) => {
    if(err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
    } else {
        res.json(updatedUser);
    }
});
});

//DELETE USER BY USERNAME
app.delete('/users/:Username', (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
        if (!user) {
            res.status(400).send(req.params.Username + ' was not found');
        } else {
            res.status(200).send(req.params.Username + ' was deleted.');
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//DELETE MOVIE FROM FAVORITES
app.delete('/users/:Username/movies/:MovieID', (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username }, {
        $delete: { FavoriteMovies: req.params.MovieID }
    },
    { new: true },
    (err, updatedUser) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        } else {
            res.json(Removed);
        }
    });
});










app.listen(5285, () => {
    console.log('listening on port 5285');
});
