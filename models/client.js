/*jslint node:true*/
'use strict';
module.exports = function (sequelize, DataTypes) {
    var Client = sequelize.define('Client', {
        nom: DataTypes.STRING,
        prenom: DataTypes.STRING,
        adresse: DataTypes.STRING,
        cp: {
            type: DataTypes.STRING(5),
            validate: {
                isNumeric: true
            }
        },
        ville: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        tel: {
            type: DataTypes.STRING(10),
            validate: {
                isNumeric: true
            }
        }
    }, {
        classMethods: {
            associate: function (models) {
                Client.hasMany(models.Commande);
            }
        }
    });
    return Client;
};
