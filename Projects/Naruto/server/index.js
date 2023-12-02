require('dotenv').config()

const express = require('express')
const cors = require('cors')

// App Declaration
const naurtoApp = express()

// App Middleware 
naurtoApp.use(express.json())
naurtoApp.use(cors())

// App Functions & Endpoints
const { createJu, getJu, modifyJu, deleteJu } = require('./controllers/userJutsu')

naurtoApp.post('api/naruto/createJutsu', createJu)
naurtoApp.get('api/naruto/getJutsu', getJu)
naurtoApp.put('api/naruto/modifyJutsu/:id', modifyJu)
naurtoApp.delete('api/naruto/deleteJutsu/:id', deleteJu)

// App Port & Listen
const naurtoPort = 1234
naurtoApp.listen(naurtoPort, () => console.log(`Naruto running on port ${naurtoPort}`));