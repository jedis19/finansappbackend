var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var request = require('request');

var whiteList = ["https://finansappdemo.firebaseapp.com/","https://www.haremaltin.com/json/all_prices.json"]

var datas;
var authService = require('./services/authService')
var dataService = require('./services/dataService')

var app = express()

var corsOptions = {
    origin:(origin,callback) => {
        if(whiteList.indexOf(origin) !==-1)
        callback(null,true);
        else
        callback(new Error(" ! ! !"))
    }
}

app.use(cors(corsOptions));
app.use(bodyParser.json());


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