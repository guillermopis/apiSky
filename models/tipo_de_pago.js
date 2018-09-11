'use strict';
module.exports = (sequelize, DataTypes) => {
  var tipo_de_pago = sequelize.define('tipo_de_pago', {
    nombre: DataTypes.STRING
  }, {
    timestamps: false,
  });
  tipo_de_pago.associate = function(models) {
    // associations can be defined here
  };
  return tipo_de_pago;
};
