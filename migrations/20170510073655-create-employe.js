/*jslint node:true*/
'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('Employes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            nom: {
                allowNull: false,
                type: Sequelize.STRING
            },
            pwd_hash: {
                allowNull: false,
                type: Sequelize.STRING
            },
/*            pwd: {
                allowNull: false,
                type: Sequelize.VIRTUAL
            },*/
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
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('Employes');
    }
};
