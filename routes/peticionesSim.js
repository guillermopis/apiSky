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
             message: 'Registros ingresados a tabla proveedores'
         }))
         .catch(error => res.json({
             error: true,
             data: [],
             error: error
         }));
});
/*
//metodo actualizar
router.put('/:id', function (req, res, next) {
    const todos = req.params.id;
    const {nombre,nit,direccion,telefono,extension,correo_empresa,estado,contacto,fecha_relacion,correo_contacto} = req.body;
    model.proveedore.update({
            nombre: nombre,
            nit: nit,
            direccion: direccion,
            telefono: telefono,
            extension: extension,
            correo_empresa: correo_empresa,
            estado: estado,
            contacto: contacto,
            fecha_relacion: fecha_relacion ,
            correo_contacto: correo_contacto
        }, {
            where: {
                id: todos
            }
        })
        .then(todo => res.status(201).json({
            error: false,
            message: 'INFORMACION ACTUALIZADA'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
});
*/

module.exports = router;