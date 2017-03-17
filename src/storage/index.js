var template = require('../template')
var weatherCity = require('../weather') 



var cities =[]
module.exports = function localstorage(position, tipo){
  
    

    if (tipo == '1'){


    
      localStorage.setItem('latitude',position.coords.latitude)
      localStorage.setItem('longitude',position.coords.longitude)
       var data  = "lat="+position.coords.latitude+"&lon="+position.coords.longitude 

      $.ajax({
         type: 'post',
         async: true,
         data: data,
         url: '/location',
         success: function(data){
           //console.log(data)

         }



      })

     }else if(tipo == '2' ){
       
     
            if(localStorage.getItem("cities")) {

                cities = JSON.parse(localStorage.cities);

            } else {
                
            }

            cities.push(position);
            localStorage.setItem("cities", JSON.stringify(cities));
     
    


     } else if(tipo == '3' && localStorage.length >= 3){

       var citi = JSON.parse(localStorage.getItem('cities'))
        
        citi.forEach(function(oldData){

           weatherCity(oldData)

           //console.log(oldData)

        })

   }else if(tipo == '4' && localStorage.length <= 3){

    

     var citi = JSON.parse(localStorage.getItem('cities'))
      
     if(citi.length === 0){
           localStorage.clear()
           alert('unexpected error. please refresh the page try again later')
     }
     

     citi.forEach(function(oldData){
          
           weatherCity(oldData)

      

        })

   }




}