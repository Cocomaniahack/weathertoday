'use strict'

 var Db = require('./lib')
 var config = require('./configDb')

 var db = new Db(config.db)


var coo = db.coneccion()
	coo.then(function(data){
    console.log('Database setup') 
    process.exit(0) 
})
