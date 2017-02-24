"use strict"

var config = require('../config');
var template = require('../template');
var changeTemplate = require('./changeTe.js')


var API_KEY = config.aws.accessKey
var API_WEATHER_URL = "http://api.openweathermap.org/data/2.5/weather?APPID="+API_KEY+"&";

 module.exports = function weatherCity(id, city, tipo){

    if(tipo == 1){

  	       $.getJSON(API_WEATHER_URL +"q="+city,  function getCurrentWeather(data){
        
                $('#'+id).html(template(data))
                changeTemplate()
                
  	    
  		
  	       })

   }else if(tipo == 2){

   	     var lat  = localStorage.getItem('latitude')
         var lon = localStorage.getItem('longitude')

         $.getJSON(API_WEATHER_URL + "lat=" + lat + "&lon=" + lon,  function getCurrentWeather(data){
                    
                $('#'+id).html(template(data))
              
                changeTemplate()
  	    
  		
  	      })
     //buttons()

   }
  
  
  }





