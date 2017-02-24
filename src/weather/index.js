"use strict"

var config = require('../config')
var template = require('../template')
var buttons = require('../buttons')

var API_KEY = config.aws.accessKey

var API_WEATHER_URL = "http://api.openweathermap.org/data/2.5/weather?APPID="+API_KEY+"&";



module.exports = function weatherCity(city){

 $.getJSON(API_WEATHER_URL +"q="+city, newCity  )
      
  
  

  function newCity(data){

        jQuery('#main-weather-city').append('<div class="newClass" style="border-top: 1px solid white;">'+
                                    '<row>'+
                                     '<div class="col-xs-11 col-sm-11 col-md-11"><h2 style="padding-left: 15px;">'+data.sys.country+'. '+data.name+'. </h2></div>'+
                                     '</row>'+
                                    '<div class="col-xs-1 col-sm-1 col-md-1" style="margin-top: 15px"><i class="fa fa-times fa-2x delete'+data.id+'" id="'+city+'" aria-hidden="true"></i></div>'+
                                     '<div class="col-xs-1 col-sm-1 col-md-1" style="margin-top: 15px"><i class="fa fa-2x fa-refresh update-c'+data.id+'" id="'+city+'"  aria-hidden="true"></i></div>'+
                                     '<div id="'+data.id+'">'+template(data)+'</div>'+
                                    
                                     '</div>'
                                    )
        buttons.update(data.id)
        buttons.change()
        $('#spiner').addClass('hide')
        return data;

   



  

  }
 





}

 