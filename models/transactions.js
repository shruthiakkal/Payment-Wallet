
import Sequelize from "sequelize";


module.exports =(sequelize, DataTypes)=>{
  const Transactions = sequelize.define(
    "Transactions",
    {
      id:{
        type:DataTypes.STRING,
        field: "id",
        defaultValue: Sequelize.UUIDV4,
        primaryKey:true
      },
      walletID: {
        type:DataTypes.STRING,
        allowNull: false,
        field: "walletID",
        required:true
      },
      balanceAfterTransaction: {
        type:DataTypes.DOUBLE,
        allowNull: false,
        field: "balanceAfterTransaction"
      },
      transactionAmount: {
        type:DataTypes.DOUBLE,
        allowNull: false,
        field: "transactionAmount"
      },
      transactionType: {
        type: DataTypes.ENUM("CREDIT", "DEBIT"),
				allowNull: false,
				field: "transactionType"
      },
      transactionStatus: {
        type: DataTypes.ENUM("STARTED", "FAILED", "COMPLETED"),
				allowNull: false,
				field: "transactionStatus"
      },
      description: {
        type:DataTypes.STRING,
        field: "description"
      },
      createdAt:{
        type:DataTypes.DATE,
        allowNull: false,
        field: "createdAt"
      },
      updatedAt:{
        type:DataTypes.DATE,
        allowNull: false,
        field: "updatedAt"
      }
    },
    {
      schema: "walletSchema",tableName: "transactions"
    },
    {
      indexes: [
        {
					unique: true,
					fields: ["walletID"],
				},
				{
					unique: false,
					fields: ["transactionAmount"],
				}
			]
    }
  );
  Transactions.associate=(models)=>{
    Transactions.belongsTo(models.Wallet,{
      foreignKey: "walletID",
    });
  }
  return Transactions;
};







