"use strict"
var http = require('http');
var fs = require("fs");
var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var client = require('./src/Db')
//var cit = require('./src/resources')





app.set(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

var upuser = new  client()

app.set('view engine', 'html');

app.use(express.static('public'));


app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
})
 


app.get('/ciudades', function (req, res){

  res.sendFile('src/resources/countries.json' , { root : __dirname});

})

app.post('/location', function (req, res){

     upuser.coneccion()

  var location = { 
      "lat":req.body.lat,
      "lon":req.body.lon 
       }
   
 var loca = upuser.insertLocation(location)

      loca.then(function (val) {
             upuser.disconnect()
       });


})



app.listen(5050, function(err){

   if(err) return console.log('Hubo un error')
   
    console.log('Escuchando por el puerto 5050...');

})
  
