var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');


//connect to mongodb via mongoose
mongoose.connect("mongodb://0.0.0.0:27017/Games",{
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
        type:String
    }
});

var gameModel = mongoose.model('gameModel', GameData);

app.get('/getdata',function(req,res){
    gameModel.find({}).then(function(games){
        res.json({games});
    })
});

app.listen(3000, function(){
    console.log("Running on Port 3000");
})