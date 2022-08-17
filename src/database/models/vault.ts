'use strict';

import { CreationOptional, DataTypes, HasManyAddAssociationsMixin, HasManyCreateAssociationMixin, Model, Sequelize } from "sequelize";
import  sequelizePaginate  from "sequelize-paginate";
import Media from "./media";
import { sequelize } from './index';

class Vault extends Model {
  declare id: CreationOptional<number>;
  declare name: string;
  declare userId: string;
  declare description: string;
  declare type: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare createMedia: HasManyCreateAssociationMixin<Media>
  declare addMedia: HasManyAddAssociationsMixin<Media, number>
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  declare static associations: {
    // define association here
  }
}

Vault.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('INSURANCE_POLICY', 'PROJECT_DOCUMENT'),
    allowNull: false
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize,
  modelName: 'Vault',
});

Vault.hasMany(Media, {
  foreignKey: 'mediaable_id',
  constraints: false,
  scope: {
    mediaable_type: 'Vault'
  },
  as: 'medias'
});

Media.belongsTo(Vault, {
  foreignKey: 'mediaable_id',
  constraints: false
});

const vaults: any = Vault;
sequelizePaginate.paginate(vaults);

export default Vault;