var express = require('express');
var router = express.Router();
var model = require('../models/index');


router.get('/:id', function (req, res, next) {
  const todo_id = req.params.id;//capturo lo que viene en id
  var paginacion = JSON.parse(todo_id);//convierto a json lo que viene en id
  console.log("valor de texto= "+paginacion.texto);
  if(paginacion.id == 'null'){
    model.gp.findAll({ 
      offset: parseInt(paginacion.a), limit: parseInt(paginacion.b),
      where:{estado: paginacion.estado}
    })//fin de findAll
    .then(apiPeticiones => res.json({
      error: false,
      data: apiPeticiones
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        error: error
    }));
  }else{
      model.gp.findAll({ where: {
          id: paginacion.id
      }})
      .then(apiPeticiones => res.json({
        error: false,
          data: apiPeticiones
      }))
      .catch(error => res.json({
          error: true,
          data: [],
          error: error
      }));
  }//fin del if
});//fin del get


//peticion POST
router.post('/', function(req,res,next){
	var{id_lote,id_marca,modelo,idsis,imei,numero_carcaza,version_firmware,estado}=req.body;
	model.gp.create({
		id_lote: id_lote,
		id_marca: id_marca,
		modelo: modelo,
		idsis: idsis,
		imei: imei,
		numero_carcaza: numero_carcaza,
		version_firmware: version_firmware,
		estado: estado
	})
	.then(todo => res.status(201).json({
		error: false,
		data: todo,
		mensaje: "GPS AGREGADO EXITOSAMENTE"
	}))
	.catch(error=>res.json({
		error: true,
		data:[],
		error: error
	}));
});//fin de funcion post
module.exports = router;