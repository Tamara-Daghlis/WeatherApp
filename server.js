
const express = require('express')
const path = require('path')
const api = require('./server/routes/api')


const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/weatherAppsDB', { useNewUrlParser: true })


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', api)


app.use(express.static(path.join(__dirname, "client")));
app.use(express.static(path.join(__dirname, "node_modules")));

const port = 3001
app.listen(port, function () {
    console.log(`Server running on port ${port}`)
})