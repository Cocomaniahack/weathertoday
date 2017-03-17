require('../Db')
var config = require('../config')
var weatherCity = require('../weather')
var buttons = require('../buttons')
var Storage = require('../storage')
var template = require('../template')
var easyAutocomplete = require('easy-autocomplete')
var tipo;


var options = {
    url: "/ciudades",
    getValue: "name",
    list: {
       match: {
         enabled: true
       }
    }
};

$("#provider-json").easyAutocomplete(options);

dataLocation()

// $( "#target" ).on('keypress', function() {
//      var dato = jQuery( "input:first" ).val()
//      select(dato)
// })

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

       //console.log('hay localStorage')
       var latitude  = localStorage.getItem('latitude')
       var longitude = localStorage.getItem('longitude')
       var t = {coords: {'latitude': latitude, 'longitude': longitude  }}
       getCurrent(t)
       
    
  }else{
     
     navigator.geolocation.getCurrentPosition(getCurrent, Error)
    

  }
}

function Error(er){

  var response = {
    id: '',
    weather: [{description: "----"}],
    icons: "---",
    main: {temp: "- -", temp_max: "--", temp_min: "--", humidity: "--"}
    

   }

  $('#spiner').addClass('hide')
  jQuery('#main-weather').html('<row>'+
                                  '<div class="col-xs-12 col-sm-12 col-md-12 alert alert-danger" style="margin-top: 14px"><h2 style="padding-left: 15px; margin-top: 14px"><strong>Sorry location not found!</strong> Best check other countries.</h2></div><div></div>'+
                                  '<div class="col-xs-11 col-sm-11 col-md-11"><h2 style="padding-left: 15px;"> -- . ---- </h2></div><div></div>'+
                                '</row>'+
                                '<div id="'+response.id+'">'+template(response)+'</div>')

  myStopFunction()
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
   
  $.getJSON(API_WEATHER_URL + "lat=" + lat + "&lon=" + lon,  function getCurrentWeather(response){


      
     $('#spiner').addClass('hide')
     jQuery('#main-weather').html('<row>'+
                                  '<div class="col-xs-11 col-sm-11 col-md-11"><h2 style="padding-left: 15px;">'+response.sys.country+'. '+response.name+' </h2></div>'+
                                  '</row>'+
                                  '<div class="col-xs-1 col-sm-1 col-md-1" style="margin-top: 15px"><i class="fa fa-2x fa-refresh update-co" aria-hidden="true"></i></div>'+
                                  '<div id="'+response.id+'">'+template(response)+'</div>')
                                    
    
     tipo = '3'
     buttons.update()
     buttons.change()
     Storage(null, tipo)
     myStopFunction()
    

   })

}

var i = 0
 var myVar =  setInterval(function(){ 
       if(i ++ > 10 ){
        tipo = '4'
        Storage(null, tipo)
       // alert('An error ocurred, please try again later.')
        myStopFunction()
       }
     },1000)
   function myStopFunction() {
         clearInterval(myVar)
    }


