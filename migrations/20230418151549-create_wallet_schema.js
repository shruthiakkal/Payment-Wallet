'use strict';

module.exports = {
  up:async (queryInterface, Sequelize) =>{
    await queryInterface.createSchema('walletSchema');
   
  },

  down:async (queryInterface, Sequelize)=>{
    await queryInterface.dropSchema('walletSchema');
    
  }
};
