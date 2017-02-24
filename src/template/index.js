var rf = require('../translate')

module.exports = function(data){

var el;
function render(data){


var tempInicial = data.main.temp
var FahreInit = tempInicial - parseInt(273.15) + parseInt(32) 
var Fahrenheit = parseFloat(FahreInit).toFixed(0)

var iconID = data.weather[0].icon
var humedad = data.main.humidity
icons(iconID)





 var template = '<row>'+
                '<div class="col-xs-12 col-sm-12 col-md-12"> <h3 style="margin-left: 15px; margin-bottom: 0px; margin-top: 0px;">'+data.weather[0].description+'</h3></div> '+
                '</row>'+
                '<div class="container-fluid" style="padding-left: 0px;">'+
                '<row>'+
                   '<div class="col-md-1 col-xs-3" style="padding-right: 0px; text-align: center"><i class="fa fa-'+icons(iconID)+' fa-3x" style="margin-top: 9px;" aria-hidden="true"></i></div>'+
                   '<div class="col-md-1 col-xs-2" style="padding-right: 0px; padding-left: 0px; display: table; text-align: center"><h1 style="margin: 0px;" class="centígrados" id="centígrados">'+cent(data.main.temp)+'</h1><h1  class="hide Fahrenheit"  style="margin: 0px;" id="Fahrenheit">'+Fahrenheit+'</h1></div>'+
                   '<div class="col-md-2 col-xs-4 ChangeTemp" style="padding-left: 8px;"><h4><a class="Celci point" style="color: whitesmoke;cursor: pointer;">ºC</a> | <a class="fare" style="color: whitesmoke;cursor: pointer;">ºF</a></h4></div>'+
                   '<div class="tempsC">'+
                   '<div class="col-md-9 col-xs-1 max-tC">Max '+cent(data.main.temp_max)+'</div>'+
                   '<div class="col-md-9 col-xs-1 min-tC">Min '+cent(data.main.temp_min)+'</div>'+
                   '</div>'+
                   '<div class="tempsF hide">'+
                   '<div class="col-md-9 col-xs-1 max-tF">Max '+farent(data.main.temp_max)+'</div>'+
                   '<div class="col-md-9 col-xs-1 min-tF">Min '+farent(data.main.temp_min)+'</div>'+
                   '</div>'+
                '</row>'+
                '</div>'+
                '<p style="color: whitesmoke; margin-left: 33px">Humidity '+humedad+' %</p>'+
                '<p style="color: whitesmoke; margin-left: 33px" class="time">Now</p>'
                          
      return template
  }



   

 

  
   

   var d  = new Date().getTime()
   setInterval(function(){
        var c = rf.date.format(d)
        $('.time').text(c)
       
     },90000)



   function cent(temperatura){
  
      var centInit = temperatura - parseInt(273.15) 
      var result   = parseFloat(centInit).toFixed(1)

      return result


   }

   function farent(temperatura){
      var FahreInit = temperatura - parseInt(273.15) + parseInt(32) 
      var Fahrenheit = parseFloat(FahreInit).toFixed(0)
      return Fahrenheit

   }

   function icons(iconID){

    switch (iconID) {
     case '01d':
       return 'sun-o'
     
     break;

     case '01n':
       return 'moon-o'
    
     break;

     case '02d':
     case '02n':
     case '03d':
     case '03n':
     case '04d':
     case '04n':
       return 'cloud'
    
     break;

     case '09d':
     case '09n':
     case '10d':
     case '10n':
       return 'tint'
     break;

     case '11d':
     case '11n':
       return 'bolt'
     break;

     case '13d':
     case '13n':
      return 'snowflake'
     break;

     case '50d':
     case '50n':
      return 'bars'
     break;

    }
	



   }


  el = render(data)
  
  return el;

}

