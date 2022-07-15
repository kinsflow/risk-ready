import {
    Sequelize,
    DataTypes
} from 'sequelize';

export interface ChatAttributes {
    last_connection ? : datatime

}

export interface ChatInstance {
    id: number;
    createdAt: Date;
    updatedAt: Date;

    last_connection: datatime

}

export default (sequelize: Sequelize, DataTypes: DataTypes) => {
    var Chat = sequelize.define('Chat', {
        last_connection: DataTypes.DATATIME
    });

    Chat.associate = function(models) {
        // associations can be defined here
    };

    return Chat;
};
