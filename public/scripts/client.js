/*jslint browser:true*/
/*global $, alert, console, Mustache*/

/*
var panierModele = [
{ produit: "Calzone", qte: 3 }
];
function updateView() {
// repercute le modele sur les elements HTML
}
*/

(function () {
    'use strict';
    /* définition des variables */
    var panier = document.getElementById("badgePanier");
    /* definitions des fonctions */
    function format(nombre) {
        nombre = nombre.toString();
        var tabNombre = nombre.split('.'), toReturn;
        if (tabNombre.length === 1) {
            toReturn = tabNombre[0] + ".00";
        } else {
            tabNombre[1] = (tabNombre[1] + "0").substr(0, 2);
            toReturn = tabNombre[0] + "." + tabNombre[1];
        }
        return toReturn;
    }
    function toAppend(datas) {
        return "<div id='" + datas.nom + "' class='prod'  title='" + datas.id + "'>" +
                   "<div class='fleft'>" + datas.nom +
                        " <span id='prix" + datas.nom + "'>" + format(datas.prix) + "</span>€ " +
                   "</div>" +
                   "<div class='fright'>" +
                        "<button id='more" + datas.nom + "' class='more'>+</button>" +
                        "<input id='qte" + datas.nom + "' name='qte" + datas.nom + "' class='qte' type='text' value='1'/>" +
                        "<button id='less" + datas.nom + "' class='less'>-</button> " +
                        "<span id='prixTotal" + datas.nom + "'>" + format(datas.prix) + "</span>€ " +
                        "<button class='suppr' id='suppr" + datas.nom + "'>" +
                            "<span class='glyphicon glyphicon-trash'></span>" +
                        "</button>" +
                    "</div>" +
                "</div>";
    }
    function accueil() {
        $.ajax({url: '/accueil', method: "GET"}).done(function (datas) {
            $("main").html(datas);
        });
    }
    function addToCart(id) {
        $.ajax({url: '/cart/add/' + id, method: "GET"}).done(function (datas) {
            datas = JSON.parse(datas);
            if (isNaN(Number(panier.innerHTML))) {
                panier.innerHTML = 1;
            } else {
                panier.innerHTML = Number(panier.innerHTML) + 1;
            }
            if ($("#listeProduit").has("#" + datas.nom).length) {
                $("#qte" + datas.nom).val(Number($("#qte" + datas.nom).val()) + 1);
                $("#prixTotal" + datas.nom).text(format(Number(datas.prix) * Number($("#qte" + datas.nom).val())));
            } else {
                $("#listeProduit").append(toAppend(datas));
            }
        });
    }
    function cart() {
        if (!$("#listeProduit").has("div").length) {
            alert("vous n'avez pas d'article dans votre panier.");
        } else {
            var listeProduits = [], listeProduitsIdx = 0, cartTemplate = $("#cartTemplate").text(), rendered;
            $("#listeProduit").find(".prod").each(function () {
                var self = this;
                console.log("#prix" + self.id);
                listeProduits[listeProduitsIdx] = {
                    id: self.title,
                    nom: self.id,
                    prix: $("#prix" + self.id).text(),
                    qte: $("#qte" + self.id).val(),
                    prixTotal: function () {return Number(this.prix) * Number(this.qte); }
                };
                listeProduitsIdx += 1;
            });
            console.log(JSON.stringify(listeProduits));
            rendered = Mustache.render(cartTemplate, {produit: listeProduits});
            console.log(rendered);
            $("main").html(rendered);
        }
    }
    function delFromCart(nom, qte) {
        var nbPanier = Number(panier.innerText);
        if (nbPanier > 1 && !(nbPanier === qte)) {
            panier.innerText = nbPanier - qte;
        } else {
            panier.innerText = '';
        }
        $("#" + nom).remove();
    }
    function addFromCart(nom) {
        nom = nom.substr(4);
        panier.innerText = Number(panier.innerText) + 1;
        $("#prixTotal" + nom).text(format(Number($("#prix" + nom).text()) * Number($("#qte" + nom).val())));
    }
    function removeFromCart(nom) {
        nom = nom.substr(4);
        panier.innerText = Number(panier.innerText) - 1;
        $("#prixTotal" + nom).text(format(Number($("#prix" + nom).text()) * Number($("#qte" + nom).val())));
    }
    function valCart() {
        
    }
    /* gestionnaire d'evenements */
    $("#accueil").on("click", accueil);
    $("#cart").on("click", cart);
    $("#logBtn").on("click", function () {
        if ($("#logUname").val() === 'admin' && $("#logPwd").val() === 'admin') {
            window.location.href = "http://localhost:8080/admin";
        } else {
            alert("le nom d'utilisateur ou le mot de passe sont incorrect");
        }
    });
    $(".clickable")
        .on("mouseover", function (ev) {
            ev.target.style.cursor = "pointer";
        })
        .on("click", function (ev) {
            addToCart(ev.target.id);
        });
    $("#listeProduit")
        .on("click", ".more", function (ev) {
            var val = Number($("#qte" + (ev.target.id).substr(4)).val());
            $("#qte" + (ev.target.id).substr(4)).val(val + 1);
            addFromCart(ev.target.id);
        })
        .on("click", ".less", function (ev) {
            var val = Number($("#qte" + (ev.target.id).substr(4)).val());
            console.log(val);
            if (val === 1) {
                delFromCart((ev.target.id).substr(4), 1);
            } else {
                $("#qte" + (ev.target.id).substr(4)).val(val - 1);
                removeFromCart(ev.target.id);
            }
        })
        .on("click", ".suppr", function (ev) {
            var qte = Number($('#qte' + (ev.target.id).substr(5)).val());
            delFromCart((ev.target.id).substr(5), qte);
        });
    $("#valCart").on("click", valCart);
}());
