'use strict';
module.exports = (sequelize, DataTypes) => {
  var historialVehiculo = sequelize.define('historialVehiculo', {
    fecha: DataTypes.DATE,
    id_gps_entrada: DataTypes.INTEGER,
    id_gps_salida: DataTypes.INTEGER,
    id_vehiculo: DataTypes.INTEGER,
    id_tecnico: DataTypes.INTEGER,
    comentario: DataTypes.STRING
  }, {
    timestamps: false,
  });
  historialVehiculo.associate = function(models) {
    // associations can be defined here
  };
  return historialVehiculo;
};