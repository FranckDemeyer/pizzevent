'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Clients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        type: Sequelize.STRING
      },
      prenom: {
        type: Sequelize.STRING
      },
      adresse: {
        type: Sequelize.STRING
      },
      cp: {
        type: Sequelize.STRING(5),
        validate: {
            isNumeric: true
        }
      },
      ville: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
      },
      tel: {
        type: Sequelize.STRING(10),
        validate: {
            isNumeric: true
        }
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
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Clients');
  }
};
