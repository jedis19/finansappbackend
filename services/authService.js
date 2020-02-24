var express = require('express');
var cors = require('cors');
var router = express.Router()
var User = require('../models/user')

router.use(cors())


router.use((req,res) => {
    res.setHeader('Access-Control-Allow-Origin','https://finansappdemo.firebaseapp.com');
})

router.post('/register', (req,res) => {
    var user = new User(req.body);
    user.isLoggedIn=false;
    user.save((error) => {
        if(!error){
            return res.status(200).send({message:"User saved"});
        }
        if(error){
            return res.status(401).send({message:error})
        }
    })
})

router.post('/login',async (req,res) => {
    var userData = req.body
 
    var user = await User.findOne({email:userData.email})
    if(!user) {
        return res.status(400).send({message:"invalid email or password",showError:true,isLoggedIn:false})
    }
    if(userData.email != user.email){
        return res.status(400).send({message:"invalid email or password",showError:true,isLoggedIn:false}) 
    }
    if(userData.password != user.password){
        return res.status(400).send({message:"invalid email or password",showError:true,isLoggedIn:false}) 
    }
   
        var email = user.email;
        await User.findOneAndUpdate({email:userData.email},{isLoggedIn:true},(error,data) => {
            if(error){
                throw data;
            }
        })

        var userLoggedIn = await User.findOne({email:userData.email});
        var loggedIn = userLoggedIn.isLoggedIn;
   
        return res.status(200).send({email,isLoggedIn:loggedIn,showError:false});
})

router.post('/logout',async (req,res) => {
    await User.findOneAndUpdate({email:"admin@hotmail.com"},{isLoggedIn:false},(error,data) => {
        if(error){
            throw error;
        }
        if(!error){
            console.log('ok')
        }
    })

    var user = await User.findOne({email:"admin@hotmail.com"})
    return res.status(200).send({isLoggedIn:user.isLoggedIn})

})

router.get('/userlogin',async (req,res) => {
    var myUser = await User.findOne({email:'admin@hotmail.com'});
    
    res.status(200).send({isLoggedIn:myUser.isLoggedIn});
})



var authService = {router};

module.exports = authService