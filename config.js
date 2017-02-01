'use strict'
var r = process.env.API_WEATHER_KEY
console.log('other key in env.sh '+r) 
var config = {
  
  aws: {
    
    accessKey: process.env.API_WEATHER_KEY || "76cd7ff9f4b72ba8655a21ddc5a1a2bd",
    accessKeyTime: process.env.API_TIME_KEY || "G8CRY6MRJHJQ"
    //"76cd7ff9f4b72ba8655a21ddc5a1a2bd"

  }


}

 // console.log('adasd '+JSON.stringify(process))
module.exports = config