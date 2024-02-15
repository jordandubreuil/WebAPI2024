var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var dataToSend;

//Sets up routes to Database Schema
require('../models/GameData')
require('../models/UnityGameData')
var GameModel = mongoose.model("games");
var UnityModel = mongoose.model("unitygames");

//All CRUD operations

router.get('/getdata',(req,res)=>{
    GameModel.find({}).then(function(games){
        console.log(games)
        res.json({games});
    }).catch(function(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});

router.post('/deletegame', function(req,res){
    console.log(req.body.game._id);
    GameModel.findByIdAndDelete(req.body.game._id).exec();
    res.redirect('games.html');
})


router.post('/updategame', function(req,res){
    console.log(req.body);
    GameModel.findByIdAndUpdate(req.body.id,{gamename:req.body.game}).then(function(){
        res.redirect('games.html');
    });
});

router.post('/saveGame', function(req,res){
    //logs data
    console.log(req.body);
    //saves data in database
    new GameModel(req.body).save().then(function(){
        res.redirect('games.html');
    });
});

//Unity Data below
router.post('/unity', function(req,res){
    console.log("Unity Posted Data: ");
    
    //saves data in database
    new UnityModel(req.body).save().then(function(){    
        dataToSend = req.body;
        console.log(req.body);
    });
    
})

router.get('/getUnity', function(req,res){

    console.log("Data being sent");
    //console.log(dataToSend);
    //res.json(dataToSend);
    UnityModel.find({}).then(function(playerdata){
        console.log(playerdata)
        res.json({playerdata});
    }).catch(function(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});

module.exports = router