import { Association, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';

import dotenv from 'dotenv';
import Property from './property';
import { uppercaseFirst } from '../../helper/helper';
import User from './user';
import fs from 'fs';
dotenv.config();

const databaseUrl: string = (process.env.DATABASE_URL as string);

const sequelize = new Sequelize(databaseUrl, {
  dialectOptions: {
    ssl: process.env.NODE_ENV == 'production' && {
      require: true,
      rejectUnauthorized: false
    }
  }
});

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
      const directoryPath = "./../../../uploads/" + this.file_path;

      return fs.readdir(directoryPath, (err, files) => {
        if (err) {
          return 'scanning error' + err
        }

        let fileInfos = [];
        console.log('aye aye', files);
        
        files.forEach((file) => {
          fileInfos.push({
            name: file,
            url: process.env.APP_URL + file,
          });
        });

        return fileInfos;
      })
      //return directoryPath //`${process.env.APP_URL}${this.folder}${this.file_path}`;
    },
    set(value) {
      throw new Error('Do not try to set the `fileUrl` value!');
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
    }
    // delete to prevent duplicates
    delete instance.Image;
    delete instance.dataValues.Image;
    delete instance.Video;
    delete instance.dataValues.Video;
  }
});

export default Media