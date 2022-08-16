'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn('Users', 'longitude', {
        type: Sequelize.STRING,
        allowNull: true
    });

    await queryInterface.addColumn('Users', 'latitude', {
        type: Sequelize.STRING,
        allowNull: true
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn('Users', 'longitude');
    await queryInterface.removeColumn('Users', 'latitude');
  }
};
