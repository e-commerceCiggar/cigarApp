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
   return queryInterface.bulkInsert('Cigars', [
     {
      name: 'Marlboro',
      price: 26000,
      stock: 10
     },
     {
      name: 'Forte',
      price: 15000,
      stock: 10
     },
     {
      name: 'Sampoerna Mild',
      price: 24000,
      stock: 10
     },
     {
      name: 'Class Mild',
      price: 17000,
      stock: 10
     },
     {
      name: 'Marlboro iceBlast',
      price: 30000,
      stock: 5
     }, 
     {
      name: 'Camel',
      price: 200500,
      stock: 5
     }
], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
