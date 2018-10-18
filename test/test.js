var chai = require('chai'),
	test_unit = require('../public/test_unit'),
	assert = chai.assert;


describe('PRUEBAS DE PROBLEMA 6, FRECUENCIA DE CLIENTES',function(){
	it('PRUEBA1, PROBANDO QUE EVALUE LOS 165 CLIENTES EXISTENTES EN LA DB', function(done){
		
		test_unit.prueba1(function(err, events){
			if(err) return done(error)
			assert.equal(events,165); //llamamos al modulo y solicitamos la funcinon		
			done()
		})
		
	}) 

	it('PRUEBA2, PROBANDO LA FRECUENCIA DEL CLIENTE ID = 10', function(done){
		
		test_unit.prueba2(function(err, events){
			if(err) return done(error)
			assert.equal(events,1.01); //llamamos al modulo y solicitamos la funcinon		
			done()
		})
		
	}) 

	it('PRUEBA3, COMPROBANDO QUE EL CLIENTE ID = 165 NUNCA HA COMPRADO', function(done){
		
		test_unit.prueba3(function(err, events){
			if(err) return done(error)
			assert.equal(events,0); //llamamos al modulo y solicitamos la funcinon		
			done()
		})
		
	}) 
})