'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Connections', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      acted_user: {
        type: Sequelize.INTEGER
      },
      first_user: {
        type: Sequelize.INTEGER
      },
      second_user: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM('pending','confirmed','blocked')
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Connections');
  }
};