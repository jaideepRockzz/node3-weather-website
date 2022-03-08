const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utility/geocode')
const forecast = require('./utility/forecast')

const app = express()
const port = porcess.env.PORT || 2000

const pathvar = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const  partialspath = path.join(__dirname,'../templates/partials')

app.use(express.static(pathvar))
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

app.get('',(req,res) => {
    res.render('index',{
        title:'Weather',
        name: 'Jaideep',
        body:'Body of home page dynamic'
    })
})
app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About',
        name: 'Jaideep',
        body: 'body of the about page dynamic'
    })
})
app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        name: 'Jaideep',
        body: 'body of the help page dynamic'
    })
})
// app.get('/about',)
// app.get('',(req,res) => {
//     res.send('Hello jaideep')
// })

app.get('/weather',(req,res) => {
    if(!req.query.address)
    return res.send({
        error : 'Please provide  address!'
    })
    geocode(req.query.address,(error,{latitude,longitude,place}={}) => {
        if(error)
        return res.send({ error })
        
        forecast(latitude,longitude, (error, data) => {
            if(error)
            return res.send({ error })
            else
            return     res.send({ forecast: data,
                                  location: place,
                                  address: req.query.address
            })
          })
        
        })
//     res.send({forecast:50,
//     location: "Hyderabad",
//     address: req.query.address
// })
})
app.get('/help/*',(req,res) => {
    res.render('error',{
        title: 'Error page for help article',
        filter: 'Help article not found',
        name : 'jaideep'
    })
})
app.get('*',(req,res) => {
res.render('error',{
        title: 'Error page',
        filter: 'Page not found',
        name  : 'jaideep'
}) 
})

app.listen(port,() => {
    console.log('Server is running on port'+port)
})

