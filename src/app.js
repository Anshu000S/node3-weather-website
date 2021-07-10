const path = require('path')
const express =require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define Paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setip handlebar engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather app',
        name: 'Anshuman Baruah'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Anshuman Baruah'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        helpText: 'This is the message.',
        title: 'Help',
        name: 'Anshuman Baruah'
    })
})


app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }

    geocode(req.query.address,(error,{logitude,latitude,location}={})=>{
        if( error){
                return res.send({error})
        }

        forecast(logitude,latitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast: 'It is hot up here',
    //     location: 'Sibsagar',
    //     address: req.query.address
    // })
})

app.get('/products',(req,res)=>{
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404', {
        title: '404',
        name: 'Anshuman Baruah',
        errorMessage:'Help Article not found'
    })
})

app.get('*',(req,res)=>{
    // res.send('My 404 page')
    res.render('404',{
        title: '404',
        name: 'Anshuman Baruah',
        errorMessage: 'Page not found'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port'+port)
})