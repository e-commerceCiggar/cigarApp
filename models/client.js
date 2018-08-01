'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = require('sequelize')
  const bcrypt = require('bcrypt')
  const Op = Sequelize.Op
  const saltRounds = 10
  var Client = sequelize.define('Client', {
    firstName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `first name cannot be empty`
        },
        is: {
          args: /^[a-zA-Z\s]*$/,
          msg: `your format is wrong`
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `last name cannot be empty`
        },
        is: {
          args: /^[a-zA-Z\s]*$/,
          msg: `your format is wrong`
        }
      }
    },
    gender: DataTypes.STRING,
    age: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `age cannot be empty`
        },
        isNumeric: {
          args: true,
          msg: `please don't input alphabet`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `email cannot be empty`
        },
        isEmail: {
          args: true,
          msg: `email format is invalid`
        },
        is: {
          args: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          msg: `email format salah lagi`
        },
        isUnique: function(email, callback) {
          Client.findOne({
            where: {
              email: email,
              id: {
                [Op.ne]: this.id
              }
            }
          })
          .then((data) => {
            if(data !== null) {
              callback(`Email has already registered`)
            } else {
              callback()
            }
          })
          .catch((err) => {
            callback(err)
          })
        }
      },
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `age cannot be empty`
        },
        isNumeric: {
          args: true,
          msg: `cannot input alphabetic`
        },
        len: {
          args: [10,12],
          msg: `your phone number is invalid`
        }
      }
    },
    password: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: `age cannot be empty`
        },
        len: {
          args: [5,8],
          msg: `password is too short/long`
        }
      }
    }
  }, {});
  Client.associate = function(models) {
    // associations can be defined here
    Client.belongsToMany(models.Cigar,{through: models.Transaction})
    Client.hasMany(models.Transaction)
  };
  return Client;
};