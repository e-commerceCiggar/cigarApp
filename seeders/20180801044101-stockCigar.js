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
      stock: 10,
      image: 'https://i.imgur.com/LRb7VhK.jpg'
     },
     {
      name: 'Forte',
      price: 15000,
      stock: 10,
      image: 'https://i.imgur.com/GA9gWaH.jpg'
     },
     {
      name: 'Sampoerna Mild',
      price: 24000,
      stock: 10,
      image: 'https://i.imgur.com/fg8ckB4.jpg'
     },
     {
      name: 'Class Mild',
      price: 17000,
      stock: 10,
      image: 'https://i.imgur.com/ghSpBre.jpg'
     },
     {
      name: 'Marlboro iceBlast',
      price: 30000,
      stock: 5,
      image: 'https://i.imgur.com/10v45sq.jpg'
     }, 
     {
      name: 'Camel',
      price: 200500,
      stock: 5,
      image: 'https://i.imgur.com/uP4N8Vl.jpg'
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
