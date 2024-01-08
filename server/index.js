require('dotenv').config();

// Frameworks & larger Middlewares
const express = require('express')
const cors = require('cors')


// App Declarations
const narutoApp = express()
const cocktailApp = express()
const totkApp = express()


// App Middlewares

    // Naruto
    narutoApp.use(express.json())
    narutoApp.use(cors())
        // This is a very basic app so just simple middlewares will be setup

    // Cocktail Hour
    const session = require('express-session')
    cocktailApp.use(express.json())
    cocktailApp.use(cors())
    cocktailApp.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 48
        }
    }))
        // Above is setting up the Cocktail Hours Middlewares and since this specific project is using Express-Sessions for the authentication part,
        // I've declared the session and written out the necessary setup for the cookies I will be using.


    // Tears of the Kingdom
    totkApp.use(express.json())
    totkApp.use(cors())
        // While not a basic app, the controllers will be using JSONWebtokens so additional middleware is not needed.


// Naruto Port, Functions, & Endpoints
const narutoPort = 1234



// Cocktail Hour Port, Sequelize Connection, Functions & Endpoints
const cocktailPort = 5678
    
    // Functions

    
    
    // Sequelize Connection, Models, & Seed file
    const { cocktailSequelize } = require('./util/cocktailHourDB')
    const { CocktailUser, Cocktails } = require('./models/Cocktail-Hour-Models/cocktailModels')
    cocktailSequelize
        .sync({force: true})
        .then(() => {
            console.log('Tables sent')
        })
        .catch((err) => {
            console.log('Connection error in Cocktail Hour')
        })
        // .sync()
        // .then(() => {
        //     console.log('Tables sent')
        // })
        // .catch((err) => {
        //     console.log('Connection error in Cocktail Hour')
        // })
            // Two different version of the same code to help clear the data from the tables/drop any tables to help with starting fresh in development stages.
            // I just commit out the block I need according to testing.





// Tears of the Kingdom Port, Sequelize Connection, Functions & Endpoints
const totkPort = 8760

    // Functions


    // Sequelize Connection & Models
    const { totkSequelize } = require('./util/totkDB')
    const { TotkUser, Helm, Chest, Leg, ArmorSet, Favorites } = require('./models/ToTK-Models/totkModels')
    const seed = require('./util/totkSeed')
    totkSequelize
        // .sync({force: true})
        // .then(() => {
        //     seed()
        //     console.log('ToTK Tables reset and sent')
        // })
        // .catch((err) => {
        //     console.log('Connection error in ToTK')
        // })
        .sync()
        .then(() => {
            console.log('ToTk Tables sent')
        })
        .catch((err) => {
            console.log('Connection error in ToTK')
        })
            // Same concept except I'm feeding the seed file and resetting the tables in the first block. After running the code, 
            // all base armors will be there and all I need to do is sync with the user tables.


// Port Listens
narutoApp.listen(narutoPort, () => console.log(`Naruto running on port ${narutoPort}`))
cocktailApp.listen(cocktailPort, () => console.log(`Serving drinks on port ${cocktailPort}`))
totkApp.listen(totkPort, () => console.log(`Saving Zelda on port ${totkPort}`))