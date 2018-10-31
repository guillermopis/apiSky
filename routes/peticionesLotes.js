var express = require('express');
var router = express.Router();
var model = require('../models/index');
/* GET listing. */
router.get('/', function (req, res, next) {
    model.lote.findAll({})
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