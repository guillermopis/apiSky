var express = require('express');
var router = express.Router();
var model = require('../models/index');
//espacio para las peticionesDeApi

/* mostramos los datos que tenga el proveedor */
router.get('/', function (req, res, next) {
  model.sim.findAll({}) 
        //el try-catch de los errores
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

/* POST todo. */
router.post('/', function(req, res, next) {
  var {
         id_marca,
         compania_telefonica,
         plan_de_datos,
         fecha_vencimiento_plan,
         fecha_inicio_plan,
         precio_del_plan,
         numero_telefono,
         iccid,
         apn,
         id_lote,
         estado
     } = req.body;

     model.sim.create({
            
            id_marca: id_marca,
            compania_telefonica:compania_telefonica,
            plan_de_datos:plan_de_datos,
            fecha_vencimiento_plan: fecha_vencimiento_plan,
            fecha_inicio_plan: fecha_inicio_plan,
            precio_del_plan: precio_del_plan,
            numero_telefono: numero_telefono,
            iccid: iccid,
            apn: apn,
            id_lote: id_lote
         })
         .then(todo => res.status(201).json({
             error: false,
             data: todo,
             message: 'Registro ingresado en la tabla sim'
         }))
         .catch(error => res.json({
             error: true,
             data: [],
             error: error
         }));
});
module.exports = router;