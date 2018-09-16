'use strict';
module.exports = (sequelize, DataTypes) => {
  var vehiculo = sequelize.define('vehiculo', {
    clienteId: DataTypes.INTEGER,
    marca: DataTypes.STRING,
    modelo: DataTypes.STRING,
    color: DataTypes.STRING,
    tipo: DataTypes.STRING,
    placa: DataTypes.STRING,
    estado: DataTypes.STRING,
    precio_servicio: DataTypes.FLOAT,
    fecha_instalacion: DataTypes.DATE,
    linea: DataTypes.STRING
  }, {
    timestamps: false,
  });
  vehiculo.associate = function(models) {
    // associations can be defined here
  };
  return vehiculo;
};
