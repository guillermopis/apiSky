'use strict';
module.exports = (sequelize, DataTypes) => {
  var tipo_mora = sequelize.define('tipo_mora', {
    descripcion: DataTypes.STRING,
    porcentaje: DataTypes.INTEGER
  }, {
    timestamps: false,
  });
  tipo_mora.associate = function(models) {
    // associations can be defined here
  };
  return tipo_mora;
};
