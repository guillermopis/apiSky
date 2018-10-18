'use strict';
module.exports = (sequelize, DataTypes) => {
  var gp = sequelize.define('gp', {
    id_lote: DataTypes.INTEGER,
    id_marca: DataTypes.INTEGER,
    modelo: DataTypes.STRING,
    idsis: DataTypes.STRING,
    imei: DataTypes.STRING,
    numero_carcaza: DataTypes.INTEGER,
    version_firmware: DataTypes.STRING,
    estado: DataTypes.STRING
  }, {
    timestamps: false,
  });
  gp.associate = function(models) {
    // associations can be defined here
  };
  return gp;
};
