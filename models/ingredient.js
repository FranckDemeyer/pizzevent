/*jslint node:true */
'use strict';
module.exports = function (sequelize, DataTypes) {
    var Ingredient = sequelize.define('Ingredient', {
        nom: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
                Ingredient.belongsToMany(models.ProduitCatalogue, {
                    through: {
                        model: models.ProduitCatalogueIngredient
                    }
                });
                Ingredient.belongsToMany(models.ProduitClient, {
                    through: {
                        model: models.ProduitClientIngredient
                    }
                });
            }
        }
    });
    return Ingredient;
};
