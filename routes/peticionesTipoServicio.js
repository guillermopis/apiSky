var express = require('express');
var router = express.Router();
var model = require('../models/index');
//var model = require('../models/index');
//espacio para las peticionesDeApi

/* GET listing. */
router.get('/', function (req, res, next) {
    model.tipo_servicio.findAll({})
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