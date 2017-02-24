require('../Db')
var config = require('../config')
var weatherCity = require('../weather')
var autocomplete = require('../autocomplete')
var select = require('../autocomplete/select.js')
var buttons = require('../buttons')
var Storage = require('../storage')
var template = require('../template')
var tipo;

autocomplete()
dataLocation()

$( "#target" ).on('keypress', function() {
     var dato = jQuery( "input:first" ).val()
     select(dato)
})

$(document).ready(function(){
  buttons.update()
  buttons.change()
});


$( "#target" ).on('submit', function( event ) {
  
    event.preventDefault(); 
    var dato = jQuery( "input:first" ).val()
    $('#suggesstion-box').addClass('hide')
    
    if(dato.length < 3){


    }else{
        $('#spiner').removeClass('hide')
        var tipo = "2"
        Storage(dato,tipo)
        weatherCity(dato)
        $( "input:first" ).val('')
         
        $('html, body').animate({
                scrollTop: $(".bd-footer").offset().top
             }, 2000);

    }

    
});

function dataLocation(){


   if(localStorage.key(0)){
       var latitude  = localStorage.getItem('latitude')
       var longitude = localStorage.getItem('longitude')
       var t = {coords: {'latitude': latitude, 'longitude': longitude  }}
       getCurrent(t)
       console.log('localStorage')
    
  }else{
     
     navigator.geolocation.getCurrentPosition(getCurrent, Error)
     console.log('buscando longitude')

  }
}


function getCurrent(dataGeolocation, done){
  
  var API_KEY = config.aws.accessKey

  var API_WEATHER_URL = "http://api.openweathermap.org/data/2.5/weather?APPID="+API_KEY+"&";

  if(!localStorage.key(0)){
    
    tipo = '1'
    Storage(dataGeolocation, tipo)
  }


   var lat = dataGeolocation.coords.latitude
   var lon = dataGeolocation.coords.longitude
   
   console.log(lat+' :'+lon )
  $.getJSON(API_WEATHER_URL + "lat=" + lat + "&lon=" + lon,  function getCurrentWeather(response){
     console.log(response)
     $('#spiner').addClass('hide')
     jQuery('#main-weather').html('<row>'+
                                  '<div class="col-xs-11 col-sm-11 col-md-11"><h2 style="padding-left: 15px;">'+response.sys.country+'. '+response.name+' </h2></div>'+
                                  '</row>'+
                                  '<div class="col-xs-1 col-sm-1 col-md-1" style="margin-top: 15px"><i class="fa fa-2x fa-refresh update-co" aria-hidden="true"></i></div>'+
                                  '<div id="'+response.id+'">'+template(response)+'</div>')
                                    
    
      tipo = '3'
  //   // buttons()
     Storage(null, tipo)
     myStopFunction()
    

   })

}

var i = 0
 var myVar =  setInterval(function(){ 
       if(i ++ > 15 ){

        alert('An error ocurred, please try again later.')
        myStopFunction()
       }
     },1000)
   function myStopFunction() {
         clearInterval(myVar)
    }


