const express = require('express');
const PORT = process.env.PORT || 3000;
const hbs = require('express-handlebars');
const path = require('path');
const app = express();
const request = require('request');
const apiKey = process.env.APIKEY;
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config();
console.log(process.env)
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//my own modules


app.engine('hbs', hbs({
    extname: 'hbs', 
    defaultLayout: 'layout', 
    layoutsDir: __dirname + '/views/layouts'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs')

app.set('public', path.join(__dirname, 'public'));

app.use(express.static('public'));

//routes
app.get('/', (req, res)=>{
    res.render('index');
});

app.post('/', (req, res)=>{
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    request(url, (err, response, body)=>{
        if(err){
            res.send(err)
        }
        else{
            let weather = JSON.parse(body)
            res.render('index', {weather: weather});
            //console.log(weather.main.temp);
        }
    });
});



app.listen(PORT, ()=>{
    console.log(`server is up and running on http://localhost:${PORT}`);
});

