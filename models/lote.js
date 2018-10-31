'use strict'
module.exports = (sequelize, DataTypes) => {

  //creamos modulo proveedor definimos los datos a utilizar
  var lote = sequelize.define('lote', {
      //id: DataTypes.DataTypes,
       codigo_lote: DataTypes.STRING,
       fecha_compra: DataTypes.DATE,
       fecha_activacion: DataTypes.DATE,
       precio_total: DataTypes.STRING,
       precio_unitario: DataTypes.FLOAT,
       id_proveedor: DataTypes.INTEGER,
       numero_dispositivos: DataTypes.INTEGER,
       duracion_plan_datos: DataTypes.STRING,
       fecha_vencimiento_plan: DataTypes.DATE
  }, {
    timestamps: false,
  });

  lote.associate = function(models) {
    // associations can be defined here
  };
  return lote;
};