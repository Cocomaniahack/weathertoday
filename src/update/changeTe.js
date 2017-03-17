"use strict"

module.exports = function bt(){


 $('.fare').on('click', function(){

               $(this).addClass('point')
               $(this).prev().removeClass('point')
               $(this).closest('.ChangeTemp').next().addClass('hide')
               $(this).closest('.ChangeTemp').nextAll('.tempsF').removeClass('hide')
               $(this).closest('.ChangeTemp').prev().find('.Fahrenheit').removeClass('hide')
               $(this).closest('.ChangeTemp').prev().find('.centígrados').addClass('hide')
                 
            })

 $('.Celci').on('click', function(){
               $(this).addClass('point')
               $(this).next().removeClass('point')
               $(this).closest('.ChangeTemp').next().removeClass('hide')
               $(this).closest('.ChangeTemp').nextAll('.tempsF').addClass('hide')
               $(this).closest('.ChangeTemp').prev().find('.centígrados').removeClass('hide')
               $(this).closest('.ChangeTemp').prev().find('.Fahrenheit').addClass('hide')
   
            })
  


}