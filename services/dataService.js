var express = require('express');
var datasLine1 = require('../models/datasline1')


var router = express.Router()

router.post('/sendrates',async (req,res) => {
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


router.get('/getrates',(req,res) => {
   datasLine1.find({},'-_id',(error,data) => {
        if(!error){
            return res.send(data);
        }if(error){
            return res.send(error);
        }
    }).select('name rate')
})

var dataService = {router}
module.exports = dataService