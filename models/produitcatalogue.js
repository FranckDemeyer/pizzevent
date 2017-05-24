/*jslint node:true*/
'use strict';
module.exports = function (sequelize, DataTypes) {
    var ProduitCatalogue = sequelize.define('ProduitCatalogue', {
        nom: DataTypes.STRING,
        prix: DataTypes.FLOAT
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
                ProduitCatalogue.belongsToMany(models.Ingredient, {
                    through: {
                        model: models.ProduitCatalogueIngredient
                    }
                });
                ProduitCatalogue.hasMany(models.ProduitClient);
            }
        }
    });
    return ProduitCatalogue;
};
