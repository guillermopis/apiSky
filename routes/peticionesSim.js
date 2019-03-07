var express = require('express');
var router = express.Router();
var model = require('../models/index');
//espacio para las peticionesDeApi

/* mostramos los datos que tenga el proveedor */
router.get('/:id', function (req, res, next) {
  //console.log(req);
  const todo_id = req.params.id;//capturo lo que viene en id
  var paginacion = JSON.parse(todo_id);//convierto a json lo que viene en id
  console.log("valor de texto= "+paginacion.texto);
  if(paginacion.id == 'null'){
    model.sim.findAll({ //offset: 0 , limit:5
      offset: parseInt(paginacion.a), limit: parseInt(paginacion.b),
      where:{compania_telefonica: {$like: ("%"+paginacion.compania_telefonica+"%")}}

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
      model.sim.findAll({ where: {
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
      }));
  }//fin del if
});//fin del get


/* POST todo. */
router.post('/', function(req, res, next) {
  var {
         id_marca,
         companiatelef,
         plandatos,
         fechaVplan,
         fechaIplan,
         precioplan,
         numerotelef,
         iccid,
         apn,
         id_lote,
         estado
     } = req.body;

     model.sim.create({
            
            id_marca: id_marca,
            compania_telefonica:companiatelef,
            plan_de_datos:plandatos,
            fecha_vencimiento_plan: fechaVplan,
            fecha_inicio_plan: fechaIplan,
            precio_del_plan: precioplan,
            numero_telefono: numerotelef,
            iccid: iccid,
            apn: apn,
            id_lote: id_lote,
            estado: estado
         })
         .then(todo => res.status(201).json({
             error: false,
             data: todo,
             mensaje: 'Registro ingresado en la tabla sim'
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
    const { 
         estado
       } = req.body;
    model.sim.update({
            estado: estado
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