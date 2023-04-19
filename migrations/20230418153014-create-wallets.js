'use strict';

const { DOUBLE } = require( "sequelize" );
const {v4} = require("uuid");

let tableModel = { schema: 'walletSchema', tableName: 'wallet' };

module.exports = {
  async up(queryInterface, Sequelize){

    const transaction = await queryInterface.sequelize.transaction();

    try{
      // 1. Create table
      await queryInterface.createTable(tableModel, {
        id: {
          primaryKey: true,
          type: Sequelize.STRING
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique:true,
          index:true
        },
        balance: {
          type: DOUBLE,
          allowNull:false,
          required:true,
          index:true
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false
        }
      });
         
      // 2. Add indices
      await queryInterface.addIndex(
        tableModel,
        [{
          attribute: 'balance'
        }],
        {
          unique: false,
          name: 'wallet_balance_index'
        }
    );

    // 3. Commit the transaction
    await transaction.commit();

    }catch(err){
      await transaction.rollback();
      throw err;
    }

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(tableModel);
  }
};