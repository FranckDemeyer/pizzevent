/*jslint node:true*/
'use strict';
module.exports = function (sequelize, DataTypes) {
    var Commande = sequelize.define('Commande', {
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
                Commande.belongsTo(models.Client);
                Commande.hasMany(models.ProduitClient);
            }
        }
    });
    return Commande;
};
