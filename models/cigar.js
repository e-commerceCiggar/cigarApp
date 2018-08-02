'use strict';
module.exports = (sequelize, DataTypes) => {
  var Cigar = sequelize.define('Cigar', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER
  }, {});
  Cigar.associate = function(models) {
    // associations can be defined here
    Cigar.belongsToMany(models.Client, {through: models.Transaction})
    Cigar.hasMany(models.Transaction)
  };
  return Cigar;
};