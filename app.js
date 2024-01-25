var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
var bodyparser = require("body-parser");

app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());


//connect to mongodb via mongoose
mongoose.connect("mongodb://127.0.0.1:27017/WebAPI",{
}).then(function(){
    console.log("Connected to MongoDb Database");
}).catch(function(err){
    console.log(err);
}); 



//var num = 6 *6;

//console.log(num);

//Example of Static Route
app.use(express.static(__dirname+'/pages'));

// JavaScript for a route

app.get('/', function(req,res){ 
    //res.send("here would be the page from the route");
    res.sendFile(path.join(__dirname+"/pages/index.html"));
});

app.get('/about', function(req,res){ 
    //res.send("here would be the page from the route");
    res.sendFile(path.join(__dirname+"/pages/about.html"));
});

app.get('/contact', function(req,res){ 
    //res.send("here would be the page from the route");
    res.sendFile(path.join(__dirname+"/pages/contact.html"));
});

var Schema = mongoose.Schema;

var GameData = new Schema({
    gamename:{
        type:String,
        required:true
    },
    gamestudio:{
        type:String,
        required:true
    }
});

var GameModel = mongoose.model('games', GameData);

//GameModel.find({}).then(function(game){console.log(game)});

app.get('/getdata',function(req,res){
    GameModel.find({}).then(function(games){
        console.log(games)
        res.json({games});
    }).catch(function(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.post('/deletegame', function(req,res){
    console.log(req.body.game._id);
    GameModel.findByIdAndDelete(req.body.game._id).exec();
    res.redirect('games.html');
})

app.post('/updategame', function(req,res){
    console.log(req.body);
    GameModel.findByIdAndUpdate(req.body.id,{gamename:req.body.game}).then(function(){
        res.redirect('games.html');
    });
});

app.listen(3000, function(){
    console.log("Running on Port 3000");
})