'use strict';

import { CreationOptional, DataTypes, Model, Sequelize } from "sequelize";

const databaseUrl: string = (process.env.DATABASE_URL as string);
const sequelize = new Sequelize(databaseUrl, {
  dialectOptions: {
    ssl: process.env.NODE_ENV == 'production' && {
      require: true,
      rejectUnauthorized: false
    }
  }
});
class Connection extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */

   declare id: CreationOptional<number>;
   declare first_user: number;
   declare second_user: number;
   declare acted_user: number;
   declare status: string;
   declare createdAt: CreationOptional<Date>;
   declare updatedAt: CreationOptional<Date>;
  static associate(models) {
    // define association here
  }
}
Connection.init({
  first_user: {
    type: DataTypes.INTEGER,
  },
  second_user: {
    type: DataTypes.INTEGER,
  },
  acted_user: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.STRING,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize,
  modelName: 'Connection',
});
