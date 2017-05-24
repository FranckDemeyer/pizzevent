#! usr/bin/env node
/*jslint node:true nomen:true*/
'use strict';
/** définition du fichier de config */
var config = require('./config/config.json'),
/** définition des inclusions */
    bodyParser = require('body-parser'),
    db = require('./models/index.js'),
    express = require('express'),
    fonctions = require('./config/lib/fonctions.js'),
/** des variables classiques */
/** puis des variables implémentées */
    app = express();
/** DEBUT DU CODE PRINCIPAL */
app
    .set('views', 'views')
    .set('view engine', 'pug')
    .use(express.static(__dirname + '/public'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: false}))
    .get('/', function (req, res) {
        console.log('>>> accès à ' + req.url);
        db.ProduitCatalogue.findAll().then(function (produits) {
            if (produits.length !== 0) {
                fonctions.ingredientsDesProduits(produits, function (results) {
                    res.render('index', {titre: "menu", ingredientsdesproduits: results});
                });
            } else {
                var results = {"id": 0, "nom": "pas de produits trouvés", "ingredients": {"0": { "nom": "aucun ingredients trouvés"}}};
                res.render('index', {titre: "menu", ingredientsdesproduits: results});
            }
        });
    })
    .get('/accueil', function (req, res) {
        console.log('>>> accès à ' + req.url);
        db.ProduitCatalogue.findAll().then(function (produits) {
            if (produits.length !== 0) {
                fonctions.ingredientsDesProduits(produits, function (results) {
                    res.render('accueil', {titre: "menu", ingredientsdesproduits: results});
                });
            } else {
                res.render('accueil-vide');
            }
        });
    })
    .get('/admin', function (req, res) {
        db.Commande.findAll().then(function (commandes) {
            if (commandes.length !== 0) {
                fonctions.clientsDesCommandes(commandes, function (results) {
                    fonctions.produitsDesCommandes(commandes, function (results) {
                        console.log("//TODO");
                    });
                });
            } else {
                res.render('commande-vide');
            }
        });
    })
    .get('/admin/nouveauproduit', function (req, res) {
        console.log('accès à ' + req.url);
        db.ProduitCatalogue.findOrCreate({where: {nom: "Wings"}, defaults: {prix: 5.5}}).spread(function (produit) {
            db.Ingredient.findOrCreate({where: {nom: "Poulet"}}).spread(function (ingredient) {
                produit.addIngredient(ingredient).then(function (result) {
                    console.log("//TODO" + result);
                });
            });
        });
        res.end();
    })
    .get('/admin/new', function (req, res) {
        console.log('accès à ' + req.url);
        db.Employe.findOrCreate({where: {id: 1}, defaults: {nom: "admin", pwd: "admin"}})
            .spread(function (employe, cree) {
                console.log(employe);
                if (cree) {
                    res.end("true");
                } else {
                    res.end("false");
                }
            });
    })
    .get('/cart/add/:id', function (req, res) {
        db.ProduitCatalogue.findOne({where: {id: req.params.id}}).then(function (produit) {
            res.end(JSON.stringify(produit));
        });
    })
    .get(config.unauthorizedPath, function (req, res, next) {
        console.log(">>> tentative d'accès non autorisé à " + req.url);
        res.status(403);
        res.render('erreur', {errNum: '403', errDescription: 'accès non autorisé.'});
        next();
    })
    .get(config.authorizedPath, function (req, res) {
        console.log('>>> accès à ' + req.url);
        res.end();
    })
    .listen(config.listeningPort, function () {console.log('server connecté est en ecoute sur le port %s', config.listeningPort); });
