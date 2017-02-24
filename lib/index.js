var Promise = require("bluebird");
var r = require('rethinkdb')
var co = require('co');



 const defaults = {
  "host": 'localhost',
  "port": 28015,
  "db": "location"
 }



class Db {

     constructor (options){

         options   = options      || {}
         this.host = options.host || defaults.host
         this.port = options.port || defaults.port
         this.db   = options.db   || defaults.db
       }

       


     coneccion (callback){
        


        this.connection = r.connect({
            host: this.host,
            port: this.port,
            db:   this.db
      
         })

       
        this.connecte = true

        var coneccion = this.connection

         var setups = co.wrap(function * () {
             var conn = yield coneccion

             var base  = yield r.dbList().run(conn)
             if(base.indexOf('location') === -1) {
                  yield r.dbCreate('location').run(conn)
             }else{
                 console.log('ya existe')
             }

             return conn

         })


         return Promise.resolve(setups()).asCallback(callback)

      }

      disconnect (callback){

        var connection = this.connection

        return Promise.resolve(this.connection).then(function(conn){

           conn.close({noreplyWait: false}).then(function() {
           
           }).error(function(err) { 
    
                return 'is not now closed '+err
           })
              
               return 'connection closed'

         })

     }
      
      selectCities(name, callback){
       //  console.log('1 '+connection)

        var connection = this.connection

        var setup = co.wrap(function * () {
       
               var conn = yield connection

               var citi = yield r.db('location').table('cities').filter(function(doc){
                        

                        return  doc('name').match("^"+name+"")


                }).distinct().limit(10).run(conn, callback);

               if(citi.errors > 0){

                  return Promise.reject(new Error(citi.first_error))
               }
  
               var resss = yield citi.toArray(function(index, result) {

                   return result
                 })

              return resss
        })
     
        return Promise.resolve(setup()).asCallback(callback)
   

       
     }


      insertLocation(location){

          var connection = this.connection

          var insert = co.wrap(function * () {

             var conn = yield connection
            
             location.createAt = new Date()

             var inLocation = yield r.db('location').table('coords').insert([location]).run(conn)

              return inLocation
          })

         return Promise.resolve(insert())

     

      }

  


}

 module.exports = Db
