'use strict';
module.exports = (sequelize, DataTypes) => {
  var usuario = sequelize.define('usuario', {
    usuario: DataTypes.STRING,
    contraseña: DataTypes.STRING,
    puesto: DataTypes.STRING,
    estado: DataTypes.STRING,
    rol: DataTypes.INTEGER
  }, {
    timestamps: false,
  });
  usuario.associate = function(models) {
    // associations can be defined here
  };
  return usuario;
};
