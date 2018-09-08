module.exports = (sequelize, DataTypes) => {
  //creamos modulo proveedor definimos los datos a utilizar
  var sim = sequelize.define('sim', {
      //id: DataTypes.DataTypes,
      id_marca: DataTypes.STRING,
      compania_telefonica: DataTypes.STRING,
      plan_de_datos: DataTypes.STRING,
      fecha_vencimiento_plan: DataTypes.STRING,
      fecha_inicio_plan: DataTypes.INTEGER,
      precio_del_plan: DataTypes.STRING,
      numero_telefono: DataTypes.STRING,
      iccid: DataTypes.STRING,
      apn: DataTypes.STRING,
      id_lote:DataTypes.INTEGER,
      estado: DataTypes.STRING

  }, {
    timestamps: false,
  });

  sim.associate = function(models) {
    // associations can be defined here
  };
  return sim;
};