'use strict';
module.exports = (sequelize, DataTypes) => {
  var tipo_servicio = sequelize.define('tipo_servicio', {
    nombre: DataTypes.STRING
  }, {
    timestamps: false,
  });
  tipo_servicio.associate = function(models) {
    // associations can be defined here
  };
  return tipo_servicio;
};
