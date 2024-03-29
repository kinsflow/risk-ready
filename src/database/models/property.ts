import { Association, CreationOptional, DataTypes, HasManyAddAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyRemoveAssociationMixin, HasManySetAssociationsMixin, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';
import sequelizePaginate from 'sequelize-paginate';
import { sequelize } from './index';
import dotenv from 'dotenv';
import Media from './media';

dotenv.config();

class Property extends Model<InferAttributes<Property>, InferCreationAttributes<Property>> {

  declare id: CreationOptional<number>;
  declare userId: number;
  declare title: String;
  declare description: String;
  declare type: CreationOptional<String>;
  declare category: CreationOptional<String>;
  declare item_name: CreationOptional<String>;
  declare date_of_purchase: CreationOptional<Date>;
  declare model: CreationOptional<String>;
  declare purchase_price: CreationOptional<String>;
  declare serial_number: CreationOptional<String>;
  declare made_by: CreationOptional<String>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare createMedia: HasManyCreateAssociationMixin<Media>
  declare addMedia: HasManyAddAssociationsMixin<Media, number>
  declare getMedias: HasManyGetAssociationsMixin<Media>
  declare setMedias: HasManySetAssociationsMixin<Media, number>
  declare removeMedia: HasManyRemoveAssociationMixin<Media, number>

  declare static associations: {
    // define association here
    medias: Association<Property, Media>;
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
  item_name: {
    type: DataTypes.STRING
  },
  date_of_purchase: {
    type: DataTypes.DATE,
    validate: {
      isDate: true
    }
  },
  model: {
    type: DataTypes.STRING
  },
  purchase_price: {
    type: DataTypes.FLOAT(11)
  },
  serial_number: {
    type: DataTypes.STRING
  },
  made_by: {
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
  as: 'medias'
});

Media.belongsTo(Property, {
  foreignKey: 'mediaable_id',
  constraints: false
});

const property: any = Property;
sequelizePaginate.paginate(property);

export default Property