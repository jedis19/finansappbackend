var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var request = require('request');

var datas;
var authService = require('./services/authService')
var dataService = require('./services/dataService')

var options = {
    url: 'https://www.haremaltin.com/ajax/all_prices',
    headers: {
        "x-requested-with": "XMLHttpRequest"
    },
}

var app = express()

app.use(cors());
app.use(bodyParser.json());


function getData() {
    request.get(options, (error, res, body) => {
        try {
            var mydata = JSON.parse(body)
            datas = mydata['data'];
           
        }catch (ex){
            console.log(ex);
        }
       
    })
}

getData()
setInterval(getData, 9000)

mongoose.connect("mongodb://hakan:123456a@ds119072.mlab.com:19072/heroku_52pxwwsv", (error) => {
    if (!error) {
        console.log('mongoya bağlandık')
    } if (error) {
        console.log(error)
    }
})

app.use('/auth', authService.router);

app.use('/rate', dataService.router)

app.get('/get', (req, res) => {
    res.send(datas)
})

app.listen(process.env.PORT);