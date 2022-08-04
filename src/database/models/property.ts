import { Association, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';
import sequelizePaginate from 'sequelize-paginate';

import dotenv from 'dotenv';
import Media from './media';

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

class Property extends Model<InferAttributes<Property>, InferCreationAttributes<Property>> {

  declare id: CreationOptional<number>;
  declare userId: number;
  declare title: String;
  declare description: String
  declare type: CreationOptional<String>
  declare category: CreationOptional<String>
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;


  declare static associations: {
    // define association here

  }
}


Property.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  type: {
    type: DataTypes.STRING
  },
  category: {
    type: DataTypes.STRING
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize,
  modelName: 'Property',
});

Property.hasMany(Media, {
  foreignKey: 'mediaable_id',
  constraints: false,
  scope: {
    mediaable_type: 'Property'
  },
  as: 'Media'
});

Media.belongsTo(Property, {
  foreignKey: 'mediaable_id',
  constraints: false
});

const p: any = Property;
sequelizePaginate.paginate(p);

export default Property