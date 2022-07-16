
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Chats', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            last_connection: {
                type: Sequelize.DATE
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

    down: (queryInterface, _Sequelize) => {
        return queryInterface.dropTable('Chats');
    }
};
