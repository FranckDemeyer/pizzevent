/*jslint node:true*/
'use strict';
function getIngredientsDesProduits(produits, callback) {
    var ingredientsDesProduits = {}, compteur = 0;
    produits.forEach(function (produit, produitIdx) {
        ingredientsDesProduits[produitIdx] = {id: produit.dataValues.id, nom: produit.dataValues.nom, prix: produit.dataValues.prix, ingredients: {}};
        produit.getIngredients().then(function (ingredients) {
            compteur += 1;
            ingredients.forEach(function (ingredient, ingredientIdx) {
                ingredientsDesProduits[produitIdx].ingredients[ingredientIdx] = {nom: ingredient.dataValues.nom};
            });
            if (compteur === produits.length) {callback(ingredientsDesProduits); }
        });
    });
}
module.exports = {
    ingredientsDesProduits: function (produits, callback) {
        getIngredientsDesProduits(produits, callback);
    }
};
