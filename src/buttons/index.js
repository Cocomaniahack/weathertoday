var template = require('../template')
var update = require('../update')

module.exports = {

        change: function(){  

          $('.fare').on('click', function(){

              
               jQuery(this).addClass('point')
               $(this).prev().removeClass('point')
               $(this).closest('.ChangeTemp').next().addClass('hide')
               $(this).closest('.ChangeTemp').nextAll('.tempsF').removeClass('hide')
                 
              $(this).closest('.ChangeTemp').prev().find('.Fahrenheit').removeClass('hide')
               $(this).closest('.ChangeTemp').prev().find('.centígrados').addClass('hide')
                 
            })



          $('.Celci').on('click', function(){
             jQuery(this).addClass('point')
             $(this).next().removeClass('point')
             $(this).closest('.ChangeTemp').next().removeClass('hide')
             $(this).closest('.ChangeTemp').nextAll('.tempsF').addClass('hide')

             $(this).closest('.ChangeTemp').prev().find('.centígrados').removeClass('hide')
             $(this).closest('.ChangeTemp').prev().find('.Fahrenheit').addClass('hide')
   
          })
      },  

     update: function(id) {

          $('.delete'+id).on('click', function(){
                   //var par = $(this).closest('.col-xs-1').prev().text()
             var cross = $(this)
             var place = cross.attr('id')
                   
                 
             if(localStorage.getItem('cities')){
                      
                var cities = JSON.parse(localStorage.cities)
                var index = cities.indexOf(place)
                cities.splice(index, 1)
                localStorage.setItem("cities", JSON.stringify(cities));
                cross.closest('.newClass').remove()

              }else{
                      
                console.Error('Error')
                    
              }
          })


       

        $('.update-c'+id).on('click', function(){
           var thi = $(this)
           var city = thi.attr('id')
           var id = thi.closest('.col-md-1').next().attr('id')
           var tipo = '1'
           update(id, city, tipo)


       })

       $('.update-co').on('click', function(){
         var id = $(this).closest('.col-md-1').next().attr('id')
         var tipo = '2'
         update(id, null, tipo)

      })
          
     }

}



