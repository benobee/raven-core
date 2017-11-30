"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var util = {
    _id: function _id(value) {
        return this.crypto(value);
    },
    cleansForSearch: function cleansForSearch(value) {
        return JSON.stringify(value).replace(/[{}"]/g, "");
    },
    hasProps: function hasProps(array, params) {
        var _this = this;

        params = util.cleansForSearch(params);
        params = params.split(",").map(function (searchTerm) {
            return "(?=.*" + searchTerm + ")";
        }).join("");

        var results = array.filter(function (item) {
            var isMatch = false;
            var values = _this.cleansForSearch(item);

            if (values.match(params) !== null) {
                isMatch = item;
            }

            return isMatch;
        });

        return results;
    },
    shuffle: function shuffle(array) {
        var currentIndex = array.length;
        var temporaryValue = null;
        var randomIndex = null;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    },
    crypto: function crypto(value) {
        // take the value and return a consistent unique ID.
        value = String(Number(value) + Number(value * Math.PI).toFixed(2)).toLowerCase();

        var list = "abcdefghijklmnopqrstuvwxyz0123456789";

        var key = ["8j8j", "2dfd", "0axt", "q9jf", "l8aj", "sm4i", "b9ks", "v2f9", "39jd", "59fj", "xjs9", "ydj9", "92jf", "psj8", "jdlj", "csk9", "413j", "1cib", "oas3", "ism8", "r2j3", "aim3", "daj3", "zam3", "w9k2", "h6ja", "mvb3", "62jf", "u8h3", "g3am", "kaj8", "fsk3", "7nnv", "ndj2", "tdj2", "e93h"];

        var encrypt = [];

        for (var i in value) {
            if (value[i]) {
                var character = value[i];

                var index = list.indexOf(character);

                if (index !== -1) {
                    var encryptValue = key[index];

                    if (!key[index]) {
                        encryptValue = "";
                    }
                    encrypt.push(encryptValue);
                }
            }
        }
        value = encrypt.join("");
        return value;
    }
};

exports.default = util;