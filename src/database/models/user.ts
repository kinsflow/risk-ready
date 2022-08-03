import {
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreationOptional,
    DataTypes,
    Sequelize,
    Association,
    HasManyGetAssociationsMixin
} from 'sequelize';

import dotenv from 'dotenv';
import Property from './property';

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
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare first_name: String;
    declare last_name: String;
    declare email: String;
    declare phone: String;
    declare token: CreationOptional<number>
    declare email_verified_at: CreationOptional<Date>;
    declare password: String;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    declare getProperties: HasManyGetAssociationsMixin<Property>;

    declare static associations: {
        properties: Association<User, Property>;
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email_verified_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.NUMBER,
        allowNull: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize,
    modelName: 'User',

    scopes: {

    },
    hooks: {
        afterCreate: (record: any) => {
            delete record.dataValues.password;
        },
        afterUpdate: (record: any) => {
            delete record.dataValues.password;
        }
    }
});

User.hasMany(Property, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    as: 'properties',
    foreignKey: {
        allowNull: false,
        name: "userId"
    },
    sourceKey: 'id'
});

export default User;