var express = require('express');
var router = express.Router();
var model = require('../models/index');
//var model = require('../models/index');
//espacio para las peticionesDeApi

/* GET listing. */
router.get('/:id', function (req, res, next) {
  const todo_id = req.params.id;//capturo lo que viene en id
  var paginacion = JSON.parse(todo_id);//convierto a json lo que viene en id
  console.log("valor de texto= "+paginacion.texto);
  if(paginacion.id == 'null'){
    model.cliente.findAll({ 
      offset: parseInt(paginacion.a), limit: parseInt(paginacion.b),
      where:{nombre: {$like: ("%"+paginacion.texto+"%")}}
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
      model.cliente.findAll({ where: {
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
        nombre,direccion,correo, dirfact, nit,telefono,estado,tipopago,tiposervicio,fecha,
        tipomora,saldo,anticipo
        } = req.body;

     model.cliente.create({
             nombre: nombre,
             direccion_fiscal: direccion,
             correo: correo,
             direccion_facturacion: dirfact,
             nit: nit,
             telefono: telefono,
             estado: estado,
             tipo_pago: tipopago,
             tipo_servicio: tiposervicio,
             fecha_ingreso: fecha,
             tipo_mora:tipomora,
             saldo_Q: saldo,
             anticipo:anticipo
         })
         .then(todo => res.status(201).json({
             error: false,
             data: todo,
             mensaje: 'INFORMACION GUARDADA CORRECTAMENTE'
         }))
         .catch(error => res.json({
             error: true,
             data: [],
             error: error
         }));
});



module.exports = router;
router.put('/:id', function (req, res, next) {
    const id = req.params.id;
    const {nombre,direccion,correo, dirfact, nit,telefono,estado,tipopago,tiposervicio,fecha,
        tipomora,saldo,anticipo} = req.body;
    model.cliente.update({
             nombre: nombre,
             direccion_fiscal: direccion,
             correo: correo,
             direccion_facturacion: dirfact,
             nit: nit,
             telefono: telefono,
             estado: estado,
             tipo_pago: tipopago,
             tipo_servicio: tiposervicio,
             fecha_ingreso: fecha,
             tipo_mora:tipomora,
             saldo_Q: saldo,
             anticipo:anticipo
        }, {
            where: {
                id: id
            }
        })
        .then(todo => res.status(201).json({
            error: false,
            mensaje: 'INFORMACION ACTUALIZADA CORRECTAMENTE'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
});

module.exports = router;

