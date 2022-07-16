import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
  DataTypes,
  Sequelize
} from 'sequelize';



const databaseUrl: string = (process.env.DEV_DATABASE_URL as string);

const sequelize = new Sequelize(databaseUrl);
class Chat extends Model<InferAttributes<Chat>, InferCreationAttributes<Chat>> {
  declare id: CreationOptional<number>;
  declare last_connection: CreationOptional<Date>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  
  declare static associations: {

  }
}

Chat.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  last_connection: {
    type: DataTypes.DATE,
    allowNull: true
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, { sequelize });

export default Chat;