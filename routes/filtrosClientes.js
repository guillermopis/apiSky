var express = require('express');
var router = express.Router();
var model = require('../models/index');
var Sequelize= require('Sequelize');

//get para filtro por nombre
router.post('/', function (req, res, next) {
  var texto ="%"+ req.body.texto+"%";
  console.log(texto);
  model.cliente.findAll({
  	where:{
  		nombre: {
        $like: texto
      }
  	}
    
  })
        .then(todos => res.json({
            error: false,
            data: todos
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
});

module.exports = router;