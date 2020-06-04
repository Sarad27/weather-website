const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define path for static and view file
const publicDirectoryPath = path.join(__dirname, '../public')
const viewDirectoryPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//Setup handle bar and views locatioin
app.set('views', viewDirectoryPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sarad'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About ME',
        name: 'Sarad'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "This is a help Message",
        title: 'Help',
        name: 'Sarad'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location  } = {} ) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, body) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: body,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query) {
        return res.send({
            error: 'No search Provided'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })

})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        message: 'Help article not found',
        name: 'Sarad'
    })
})


app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        message: '404 ERROR Page not found',
        name: 'Sarad'
    })
})


app.listen(port, () => {
    console.log("Server is running in port" + port)
})