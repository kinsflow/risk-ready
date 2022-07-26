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

const databaseUrl: string = (process.env.DATABASE_URL as string);

const sequelize = new Sequelize(databaseUrl, {
    dialectOptions: {
        ssl: {
            require: process.env.NODE_ENV == 'production',
            rejectUnauthorized: process.env.NODE_ENV != 'production'
        }
    }
});
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare first_name: String;
    declare last_name: String;
    declare email: String;
    declare token: CreationOptional<number>
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
        withoutPassword: {
            attributes: { exclude: ['password'] }
        }
    }
});

export default User;