'use strict';

const { DOUBLE } = require( "sequelize" );

let tableModel = { schema: 'walletSchema', tableName: 'transactions' };

module.exports = {
  async up(queryInterface, Sequelize){

    const transaction = await queryInterface.sequelize.transaction();

    try{
      
      await queryInterface.createTable(tableModel,{
        id:{
          primaryKey: true,
          type: Sequelize.STRING
        },
        walletID:{
          type: Sequelize.DataTypes.STRING,
          references: {
            model: {
              tableName: 'wallet',
              schema: 'walletSchema'
            },
            key: 'id'
          },
          allowNull: false,
        },
        balanceAfterTransaction:{
          type: DOUBLE,
          allowNull: false
        },
        transactionAmount:{
          allowNull: false,
          type: DOUBLE
        },
        transactionType:{
          allowNull: false,
          type: Sequelize.DataTypes.ENUM("CREDIT", "DEBIT"),
        },
        transactionStatus:{
          allowNull: false,
          type: Sequelize.DataTypes.ENUM("STARTED", "FAILED", "COMPLETED"),
        },
        description:{
          type: Sequelize.DataTypes.STRING
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
  
      
      await queryInterface.addIndex(
        tableModel,
        [{
          attribute: 'walletID'
        }],
        {
          unique: false,
          name: 'wallet_id_transaction_data_index'
        }
      );

      await queryInterface.addIndex(
        tableModel,
        [{
          attribute: 'transactionAmount'
        }],
        {
          unique: false,
          name: 'transaction_amount_transaction_data_index'
        }
      );
    
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