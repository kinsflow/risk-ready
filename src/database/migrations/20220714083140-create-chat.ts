import {
    QueryInterface,
} from 'sequelize';

export default {
    up: (queryInterface: QueryInterface, Sequelize) => {
        return queryInterface.createTable('Chats', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            last_connection: {
                type: Sequelize.DATATIME
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },

            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    down: (queryInterface: QueryInterface, _Sequelize) => {
        return queryInterface.dropTable('Chats');
    }
};
