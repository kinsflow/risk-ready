import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from './index';

class Group extends Model {
  declare title: String;
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
   declare static associations: {
    // define association here
  }
}
Group.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
}, {
  sequelize,
  modelName: 'Group',
});

export default Group