/*jslint node:true*/
'use strict';
var crypto = require('crypto');
module.exports = function (sequelize, DataTypes) {
    var Employe = sequelize.define('Employe', {
        nom: DataTypes.STRING,
        pwd_hash: DataTypes.STRING,
        pwd: {
            type: DataTypes.VIRTUAL,
            set: function (val) {
                var preSalt = "x6:Qd", postSalt = "yZ5W!";
                this.setDataValue('pwd', val);
                this.setDataValue('pwd_hash', crypto.createHmac('sha512', preSalt + val + postSalt).digest('hex'));
            },
            validate: {
                complexe: function (val) {
                    var pwdRE = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d.,;:!#$@%&'*+\\/<>=?^_`({|})~-]{8,}$");
                    if (!pwdRE.test(val)) {
                        throw new Error("votre mot de passe doit comporter au moins 8 caractères dont au moins un chiffre, une majuscule, une minuscule et un caractère spécial.");
                    }
                }
            }
        }
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });
    return Employe;
};
