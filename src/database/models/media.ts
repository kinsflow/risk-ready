import { Association, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';

import dotenv from 'dotenv';
import Property from './property';
import { uppercaseFirst } from '../../helper/helper';
import User from './user';
import fs from 'fs';
import Vault from './vault';
import { sequelize } from './index';
dotenv.config();

class Media extends Model<InferAttributes<Media>, InferCreationAttributes<Media>> {
  declare id: CreationOptional<number>;
  declare mediaable_type: string;
  declare mediaable_id: String;
  declare file_path: String;
  declare type: String;
  declare fileUrl: String;
  declare folder: String;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  declare static associate: {
    // define association here
    Property: Association<Media, Property>;
    vault: Association<Media, Vault>;
  }

  getMediaable(options: any) {
    if (!this.mediaable_type) return Promise.resolve(null);
    const mixinMethodName = `get${uppercaseFirst(this.mediaable_type)}`;
    return this[mixinMethodName](options);
  }
}

Media.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  mediaable_type: {
    type: DataTypes.STRING
  },
  mediaable_id: {
    type: DataTypes.INTEGER
  },
  file_path: {
    type: DataTypes.STRING
  },
  fileUrl: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${process.env.APP_URL}${this.folder}/${this.file_path}`;
    },
    set(value) {
      throw new Error(`Do not try to set the ${`fileUrl`} ${value} value!`);
    }
  },
  type: {
    type: DataTypes.STRING
  },
  folder: {
    type: DataTypes.STRING
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize,
  modelName: 'Media',
});





Media.addHook("afterFind", (findResult: any) => {
  if (!Array.isArray(findResult)) findResult = [findResult];
  for (const instance of findResult) {
    if (instance.mediaable_type === "User" && instance.User !== undefined) {
      instance.mediaable = instance.User;
    } else if (instance.mediaable_type === "Property" && instance.Property !== undefined) {
      instance.mediaable = instance.Property;
    } else if (instance.mediaable_type === "Vault" && instance.Vault !== undefined) {
      instance.mediaable = instance.Vault;
    }
    // delete to prevent duplicates
    delete instance.User;
    delete instance.dataValues.User;
    delete instance.Property;
    delete instance.dataValues.Property;
    delete instance.Vault;
    delete instance.dataValues.Vault;
  }
});

export default Media