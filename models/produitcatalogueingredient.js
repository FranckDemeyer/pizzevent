/*jslint node:true*/
'use strict';
module.exports = function (sequelize, DataTypes) {
    var ProduitCatalogueIngredient = sequelize.define('ProduitCatalogueIngredient', {
        ingredientId: DataTypes.INTEGER,
        produitCatalogueId: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });
    return ProduitCatalogueIngredient;
};
