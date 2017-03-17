"use strict"

var Promise = require("bluebird");
var r = require('rethinkdb')
var co = require('co');

const defaults = {
  "host": 'localhost',
  "port": 28015,
  "db": "weatherDb"
 }



class Db {

     constructor (options){

         options   = options      || {}
         this.host = options.host || defaults.host
         this.port = options.port || defaults.port
         this.db   = options.db   || defaults.db
       }

       
 //---------------------------------------------------------------------------------------

     coneccion (callback){
        
      

        this.connection = r.connect({
            host: this.host,
            port: this.port,
            db:   this.db
      
         })
         
         this.connecte = true

         var db = this.db

         var coneccion = this.connection

         return Promise.resolve(coneccion).asCallback(callback)

      }
 //---------------------------------------------------------------------------------------
      disconnect (callback){

        if(!this.connecte){
          
         return Promise.reject(new Error('not connected')).asCallback(callback)
        }

        this.connecte = false

        var connection = this.connection

        return Promise.resolve(this.connection).then(function(conn){

           conn.close({noreplyWait: false}).then(function() {
           
           }).error(function(err) { 
    
                return 'is not now closed '+err
           })
              
               return 'connection closed'

         })

     }
     //---------------------------------------------------------------------------------------

     firstConeccion (callback){

        var connection = this.connection
        var db = this.db
        var setup = co.wrap(function * () {
       
             var conn = yield connection
             
             var base  = yield r.dbList().run(conn)
             if(base.indexOf(db) === -1) {
                  yield r.dbCreate(db).run(conn)
             }

             var tablaCiti = yield r.db(db).tableList().run(conn)
             if(tablaCiti.indexOf('cities') === -1){
                  yield r.db(db).tableCreate('cities').run(conn)
                 
             }

             if(tablaCiti.indexOf('coords') === -1){
               yield r.db(db).tableCreate('coords').run(conn)
             }

            return conn

        })

        return Promise.resolve(setup()).asCallback(callback)


     }
      
 //---------------------------------------------------------------------------------------
     //  selectCities(name, callback){
     
       
     //   if(this.connecte == false){
     //     console.log('error de coneccion')
     //    // return Promise.reject(new Error('not connected')).asCallback(callback)
     //   }else{

        


     //    var connection = this.connection
     //    var db = this.db
     //    var setup = co.wrap(function * () {
       
     //           var conn = yield connection
              
            
     //           var citi = yield r.db(db).table('cities').filter(function(doc){
                        

     //                    return  doc('name').match("^"+name+"")


     //            }).distinct().limit(10).run(conn, callback);

     //           // if(citi.errors > 0){
                  
     //           //    return Promise.reject(new Error(citi.first_error))
     //           // }


     //           var resss = yield citi.toArray(function(index, result) {

     //               return result

     //             })

     //          return resss

             
     //    })
     //  }
     
     //    return Promise.resolve(setup()).asCallback(callback)
   

       
     // }

 //---------------------------------------------------------------------------------------

      insertLocation(location, callback){

          var connection = this.connection
          var db = this.db

          var insert = co.wrap(function * () {

             var conn = yield connection
            
             location.createAt = new Date()

             var inLocation = yield r.db(db).table('coords').insert([location]).run(conn)

              return inLocation
          })

         return Promise.resolve(insert()).asCallback(callback)

     

      }
//---------------------------------------------------------------------------------------
      selectCroods(callback){
       
         var connection = this.connection
         var db = this.db
         
          var SelectCroods = co.wrap(function * () {

              var conn = yield connection

              var coords = yield r.db(db).table('coords').run(conn)

              //console.log(coords)

               var response = yield coords.toArray(function(index, result) {

                  return result
               }) 

              return response
             
          })

         return Promise.resolve(SelectCroods()).asCallback(callback)


      }

  


}

 module.exports = Db
