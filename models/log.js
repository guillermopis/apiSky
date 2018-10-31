module.exports = (sequelize, DataTypes) => {
  //creamos modulo proveedor definimos los datos a utilizar
  var log = sequelize.define('log', {
      //id: DataTypes.DataTypes,
      descripcion: DataTypes.STRING,
      resultado: DataTypes.STRING,
      fecha: DataTypes.STRING,
      usuario: DataTypes.STRING,
      definicion: DataTypes.STRING

  }, {
    timestamps: false,
  });

  log.associate = function(models) {
    // associations can be defined here
  };
  return log;
};