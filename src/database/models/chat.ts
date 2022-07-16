import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional
} from 'sequelize';


class Chat extends Model<InferAttributes<Chat>, InferCreationAttributes<Chat>> {
  declare id: CreationOptional<number>;
  declare last_connection: CreationOptional<Date>;

  declare static associations: {

  }
}
export default Chat;