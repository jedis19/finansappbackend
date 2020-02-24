var express = require('express');
var datasLine1 = require('../models/datasline1')
var datasLine2= require('../models/datasline2');
var datasLine3 = require('../models/datasline3')


var router = express.Router()


router.post('/sendratesline1',async (req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "https://finansappdemo.firebaseapp.com");
    var userData = new datasLine1(req.body);
    var findData =await datasLine1.findOne({name:userData.name})
    if(findData){
        findData.update({rate:userData.rate},(error,dat) => {
            if(error){
                throw error;
            }
            return res.status(200).send({message:"Veri değiştirildi"})
        })
    }if(!findData){
        userData.save((error) => {
            if(!error){
                return res.status(200).send({message:'Veri kaydedildi'})
            }
            if(error){
                return res.status(400).send({message:error});
            }
        })
        
    }
})

router.post('/sendratesline2',async (req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "https://finansappdemo.firebaseapp.com");
    var userData = new datasLine2(req.body);
    var findData =await datasLine2.findOne({name:userData.name})
    if(findData){
        findData.update({rate:userData.rate},(error,dat) => {
            if(error){
                throw error;
            }
            return res.status(200).send({message:"Veri değiştirildi"})
        })
    }if(!findData){
        userData.save((error) => {
            if(!error){
                return res.status(200).send({message:'Veri kaydedildi'})
            }
            if(error){
                return res.status(400).send({message:error});
            }
        })
        
    }
})

router.post('/sendratesline3',async (req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "https://finansappdemo.firebaseapp.com");
    var userData = new datasLine3(req.body);
    var findData =await datasLine3.findOne({name:userData.name})
    if(findData){
        findData.update({rate:userData.rate},(error,dat) => {
            if(error){
                throw error;
            }
            return res.status(200).send({message:"Veri değiştirildi"})
        })
    }if(!findData){
        userData.save((error) => {
            if(!error){
                return res.status(200).send({message:'Veri kaydedildi'})
            }
            if(error){
                return res.status(400).send({message:error});
            }
        })
        
    }
})


router.get('/getratesline1',(req,res) => {
   datasLine1.find({},'-_id',(error,data) => {
        if(!error){
            return res.send(data);
        }if(error){
            return res.send(error);
        }
    }).select('name rate')
})

router.get('/getratesline2',(req,res) => {
    datasLine2.find({},'-_id',(error,data) => {
         if(!error){
             return res.send(data);
         }if(error){
             return res.send(error);
         }
     }).select('name rate')
 })

 router.get('/getratesline3',(req,res) => {
    datasLine3.find({},'-_id',(error,data) => {
         if(!error){
             return res.send(data);
         }if(error){
             return res.send(error);
         }
     }).select('name rate')
 })

var dataService = {router}
module.exports = dataService