'use strict';
module.exports = (sequelize, DataTypes) => {
  var Transaction = sequelize.define('Transaction', {
    ClientId: DataTypes.INTEGER,
    CigarId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    timeLimit: DataTypes.INTEGER
  }, {});

  Transaction.associate = function(models) {
    // associations can be defined here
    Transaction.belongsTo(models.Cigar)
    Transaction.belongsTo(models.Client)
  };
  return Transaction;
}