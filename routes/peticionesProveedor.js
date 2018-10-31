'use strict'
//"password": "maruntes",
    //"host": "basecrud.cmib4k2ppmwh.ca-central-1.rds.amazonaws.com",
var express = require('express');
var router = express.Router();
var model = require('../models/index');
//var domain = require('../domain/domain');
//var logger = require('../logger');

/* mostramos los datos que tenga el proveedor */
router.get('/:id', function (req, res, next) {
    //console.log(req);
  const todo_id = req.params.id;//capturo lo que viene en id
  var paginacion = JSON.parse(todo_id);//convierto a json lo que viene en id
  //console.log("valor de texto= "+paginacion.texto);
  if(paginacion.id == 'null'){
    model.proveedore.findAll({ //offset: 0 , limit:5
      offset: parseInt(paginacion.a), limit: parseInt(paginacion.b),
      where:{nombre: {$like: ("%"+paginacion.nombre+"%")}}

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
      model.proveedore.findAll({ where: {
          id: todo_id
      }})
      .then(apiPeticiones => res.json({
        error: false,
          data: apiPeticiones
      }))
      .catch(error => res.json({
          error: true,
          data: [],
          error: error
          //log_file.write(error)
      }));
  }//fin del if
});//fin del get



/* POST todo. */
router.post('/', function(req, res, next) {
  var {
         nombre,
         nit,
         direccion,
         telefono,
         extension,
         correo_empresa,
         estado,
         contacto,
         fecha_relacion,
         correo_contacto   
     } = req.body;

     model.proveedore.create({
            
            nombre: nombre,
            nit: nit,
            direccion: direccion,
            telefono: telefono,
            extension: extension,
            correo_empresa: correo_empresa,
            estado: estado,
            contacto: contacto,
            fecha_relacion: fecha_relacion,
            correo_contacto: correo_contacto
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

//metodo actualizar
router.put('/:id', function (req, res, next) {
    const todos = req.params.id;
    const {nombre,nit,direccion,telefono,
      extension,correo_empresa,estado,contacto,fecha_relacion,correo_contacto} = req.body;
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
            error: error,
            message: 'no se pudo actualizar'
        }));
});

module.exports = router;