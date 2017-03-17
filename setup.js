'use strict'

var Db = require('./src/Db')
var config = require('./configDb')

  var db = new Db(config.db)
  db.coneccion()



var coo = db.firstConeccion()
	coo.then(function(data){
    console.log('Database setup: '+data) 
    process.exit(0) 
})

//console.log(config)
