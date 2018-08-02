'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Clients', [{
    firstName: 'Andre',
    lastName: 'Sudi',
    gender: 'Male',
    age: 23,
    email: 'y.andresudi@gmail.com',
    phone: '081296269027',
    password: '123456',
    role: 'Admin'
  }, {
    firstName: 'Muhammad',
    lastName: 'Riza',
    gender: 'Male',
    age: 30,
    email: 'riza.riza69@gmail.com',
    phone: '08119780702',
    password: '123456',
    role: 'Admin'
  }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
   return queryInterface.bulkDelete('Clients', null, {});
  }
};
