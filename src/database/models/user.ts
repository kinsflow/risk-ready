import {
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreationOptional,
    DataTypes,
    Sequelize
} from 'sequelize';

import dotenv from 'dotenv';

dotenv.config();

const databaseUrl: string = (process.env.DEV_DATABASE_URL as string);

const sequelize = new Sequelize(databaseUrl);
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare first_name: String;
    declare last_name: String;
    declare email: String;
    declare email_verified_at: CreationOptional<Date>;
    declare password: String;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    declare static associations: {

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
    email_verified_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize,
    modelName: 'User',
    defaultScope: {
        attributes: { exclude: ['password'] }
    }
});

export default User;