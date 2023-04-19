
import Sequelize from "sequelize";


module.exports =(sequelize, DataTypes)=>{
  const Wallet = sequelize.define(
    "Wallet",
    {
      id:{
        type:DataTypes.STRING,
        field: "id",
        defaultValue: Sequelize.UUIDV4,
        
        primaryKey:true
      },
      name: {
        type:DataTypes.STRING,
        allowNull: false,
        field: "name",
        required:true,
        unique:true
      },
      balance: {
        type:DataTypes.DOUBLE,
        allowNull: false,
        field: "balance",
        required:true
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
      schema: "walletSchema",tableName: "wallet"
    },
    {
      indexes: [
        {
					unique: true,
					fields: ["name"],
				}
			]
    }
  );
  Wallet.association =(model)=>{
    Wallet.hasMany(model.Transactions,{
      foreignKey: "walletID",
    });

  }

  return Wallet;
};







