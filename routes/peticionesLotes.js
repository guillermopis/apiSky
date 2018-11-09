var express = require('express');
var router = express.Router();
var model = require('../models/index');

/* mostramos los datos que tenga lotes */
router.get('/:id', function (req, res, next) {
    //console.log(req);
  const todo_id = req.params.id;//capturo lo que viene en id
  var paginacion = JSON.parse(todo_id);//convierto a json lo que viene en id
  //console.log("valor de texto= "+paginacion.texto);
  if(paginacion.id == 'null'){
    model.lote.findAll({ //offset: 0 , limit:5
      offset: parseInt(paginacion.a), limit: parseInt(paginacion.b),
      where:{codigo_lote: {$like: ("%"+paginacion.codigo_lote+"%")}}
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
    //si no selecciona un id podemos devolver todos los datos de lotes
      model.lote.findAll({ where: {
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
        clote,
       fcompra,
       factivacion,
       preciototal,
       preciounitario,
       idproveedor,
       ndispositivos,
       duracionplan,
       fvplan  
     } = req.body;

     model.lote.create({
            
            codigo_lote: clote,
            fecha_compra: fcompra,
            fecha_activacion: factivacion,
            precio_total: preciototal,
            precio_unitario: preciounitario,
            id_proveedor: idproveedor,
            numero_dispositivos: ndispositivos,
            duracion_plan_datos: duracionplan,
            fecha_vencimiento_plan: fvplan 
         })
         .then(todo => res.status(201).json({
             error: false,
             data: todo,
             mensaje: 'Registro nuevo en tabla Lotes'
         }))
         .catch(error => res.json({
             error: true,
             data: [],
             error: error
         }));
});


module.exports = router;