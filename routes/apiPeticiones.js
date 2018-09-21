var express = require('express');
var router = express.Router();
var model = require('../models/index');
//var model = require('../models/index');
//espacio para las peticionesDeApi

router.get('/:id', function(req, res, next){
  const id=req.params.id;
  var parametros = JSON.parse(id);
  console.log(parametros);
  if((parametros.user !="null") && (parametros.pass!="null")){
    model.usuario.findAll({ where:{
        usuario: parametros.user,
        contraseña: parametros.pass,}
    }).then(apiPeticiones => res.json({
      error: false,
      data: apiPeticiones,

    }))
    .catch(error => res.json({
      error: true,
      data: [],
      error: error
    }));
  }else{
    model.usuario.findAll({where:{puesto:parametros.puesto}})
    .then(apiPeticiones => res.json({
      error: false,
      data: apiPeticiones,

    }))
    .catch(error => res.json({
      error: true,
      data: [],
      error: error
    }));
  }
    
}); //fin de get

module.exports = router;
