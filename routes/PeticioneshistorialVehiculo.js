var express = require('express');
var router = express.Router();
var model = require('../models/index');
var Sequelize = require('sequelize');
var Moment = require('Moment');
//var sequelize = new Sequelize();

const sequelize = new Sequelize('SkyrangerDB', 'sa', 'maruntes', {
  
  //username: 'sa',
  //password: 'maruntes',
  //database: 'SkyrangerDB',
  host: '127.0.0.1',
  dialect: 'mssql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  //storage: 'path/to/database.sqlite'
});






router.get('/:id', function (req, res, next) {
  const todo_id = req.params.id;//capturo lo que viene en id
  var paginacion = JSON.parse(todo_id);//convierto a json lo que viene en id
  console.log("valor de texto= "+paginacion.texto);
  if(paginacion.id == 'null'){
    model.historialVehiculo.findAll({ 
      offset: parseInt(paginacion.a), limit: parseInt(paginacion.b),
      //where:{nombre: {$like: ("%"+paginacion.texto+"%")}}
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
      model.historialVehiculo.findAll({ 
        where:{
          id_vehiculo: paginacion.id
        },
        order:[
          ['fecha', 'DESC']
        ]

    })
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


router.post('/',function(req,res,next){
var fecha=Moment().format('L');
var hora=Moment().format('LTS');
var datetime = (fecha +' '+hora);
var{id_gps_entrada,id_gps_salida,idVehiculo,id_tecnico,comentario,id_gps}=req.body;
console.log("valor de gps_Salida: "+id_gps_salida);
var query = 'exec sp_asignarGPS :fecha, :id_gps_entrada, :id_gps_salida, :idVehiculo, :id_tecnico, :comentario'; 
console.log("estoy antes de sequelize");
sequelize.query(query,
  {replacements: {
    fecha:datetime,id_gps_entrada:id_gps_entrada, id_gps_salida: id_gps_salida,
    idVehiculo: idVehiculo, id_tecnico: id_tecnico, comentario: comentario, 
  }, 
  type: sequelize.QueryTypes.SELECT }
).then(apiPeticiones => res.json({ 
  error: false,
  data:apiPeticiones
})); 


});//fin de post

module.exports = router;