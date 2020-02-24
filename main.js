var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var request = require('request');

var datas;
var authService = require('./services/authService')
var dataService = require('./services/dataService')

var app = express()


app.use(cors());
app.use(bodyParser.json());

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://finansappdemo.firebaseapp.com/");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
})

function getData(){
    request.get('https://www.haremaltin.com/json/all_prices.json',(error,res,body) => {
        datas = JSON.parse(body);
    })
}

setInterval(getData,8000)

mongoose.connect("mongodb://hakan:123456a@ds119072.mlab.com:19072/heroku_52pxwwsv",(error) => {
    if(!error){
        console.log('mongoya bağlandık')
    }if(error){
        console.log(error)
    }
})

app.use('/auth',authService.router);

app.use('/rate',dataService.router)

app.get('/get',(req,res) => {
   res.send(datas)
})

app.listen(process.env.PORT);