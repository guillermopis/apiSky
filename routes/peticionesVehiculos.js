var express = require('express');
var router = express.Router();
var model = require('../models/index');
//definimos las asociaciones de moles, hasMany and belogTo
model.vehiculo.belongsTo(model.cliente);
//model.cliente.hasMany(model.vehiculo);

//aca iran todas las peticioines para vehiculos
router.get('/:ids', function (req, res, next) {
	const ids = req.params.ids;
	var paginacion = JSON.parse(ids);
    model.vehiculo.findAll({
    	//attributes:['placa','marca'],//->si quiero solo unos atributos
    	offset: parseInt(paginacion.a), limit: parseInt(paginacion.b),
    	where:{placa:{$like:("%"+paginacion.placa+"%")},
    	id:{$like:("%"+paginacion.id+"%")}},//filtra por placa
    	include:[{ //le digo a sequelize que incluya el modelo cliente y que traiga id, nombre
    		model: model.cliente,
    		attributes:['id','nombre'],
    		where:{nombre: {$like:("%"+paginacion.texto+"%")}}//fin del where
    	}]//fin de include
    	
    })
    .then(apiPeticiones => res.json({
      error: false,
      data: apiPeticiones
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        error: error
    }));
});//fin del get

//peticion POST
router.post('/', function(req,res,next){
	var{clienteId,marca,linea,modelo,color,tipo,placa,motor,chasis,estado,precio_servicio,fecha_instalacion}=req.body;
	model.vehiculo.create({
		clienteId: clienteId,
		marca: marca,
		linea: linea,
		modelo: modelo,
		color: color,
		tipo: tipo,
		placa: placa,
		motor: motor,
		chasis: chasis,
		estado: estado,
		precio_servicio: precio_servicio,
		fecha_instalacion: fecha_instalacion
	})
	.then(todo => res.status(201).json({
		error: false,
		data: todo,
		mensaje: "VEHICULO AGREGADO EXITOSAMENTE"
	}))
	.catch(error=>res.json({
		error: true,
		data:[],
		error: error
	}));
});//fin de funcion post

//funcion put
router.put('/:id', function(req,res,next){
	const id=req.params.id;
	const{marca,linea,modelo,color,tipo,placa,motor,chasis,estado,precio_servicio,fecha_instalacion}=req.body;
	model.vehiculo.update({
		marca: marca,
		linea: linea,
		modelo: modelo,
		color: color,
		tipo: tipo,
		placa: placa,
		motor: motor,
		chasis: chasis,
		estado: estado,
		precio_servicio: precio_servicio,
		fecha_instalacion: fecha_instalacion
	},{
		where:{
			id:id
		}
	})
	.then(todo=>res.status(201).json({
		error: false,
		mensaje: 'INFORMACION ACTUALIZADA CORRECTAMENTE'
	}))
	.catch(error => res.json({
		error: true,
		error: error
	}));
});//fin de funcion put

module.exports = router;