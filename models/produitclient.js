/*jslint node:true*/
'use strict';
module.exports = function (sequelize, DataTypes) {
    var ProduitClient = sequelize.define('ProduitClient', {
        nom: DataTypes.STRING,
        prix: DataTypes.FLOAT
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
                ProduitClient.belongsTo(models.ProduitCatalogue);
                ProduitClient.belongsTo(models.Commande);
                ProduitClient.belongsToMany(models.Ingredient, {
                    through: {
                        model: models.ProduitClientIngredient
                    }
                });
            }
        }
    });
    return ProduitClient;
};
