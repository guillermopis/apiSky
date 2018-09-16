var express = require('express');
var router = express.Router();
var model = require('../models/index');
//definimos las asociaciones de moles, hasMany and belogTo
model.vehiculo.belongsTo(model.cliente);
//model.cliente.hasMany(model.vehiculo);

//aca iran todas las peticioines para vehiculos
router.get('/:id', function (req, res, next) {
	const id = req.params.id;
	var paginacion = JSON.parse(id);
    model.vehiculo.findAll({
    	//attributes:['placa','marca'],//->si quiero solo unos atributos
    	offset: parseInt(paginacion.a), limit: parseInt(paginacion.b),
    	where:{placa:{$like:("%"+paginacion.placa+"%")}},//filtra por placa
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

module.exports = router;