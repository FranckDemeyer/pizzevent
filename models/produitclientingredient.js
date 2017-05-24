/*jslint node:true*/
'use strict';
module.exports = function (sequelize, DataTypes) {
    var ProduitClientIngredient = sequelize.define('ProduitClientIngredient', {
        ingredientId: DataTypes.INTEGER,
        produitClientId: DataTypes.INTEGER,
        quantite: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });
    return ProduitClientIngredient;
};
