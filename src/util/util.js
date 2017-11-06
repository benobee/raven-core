const util = {
    _id(value, name) {
        let userInput = "";

        if (value) {
            userInput = value;
        }

        let date = new Date();

        date = date.getMilliseconds().toString();

        let firstPart = (Math.random() * 46656) | 0;
        let secondPart = (Math.random() * 46656) | 0;

        firstPart = (`000${ firstPart.toString(36)}`).slice(-3);
        secondPart = (`000${ secondPart.toString(36)}`).slice(-3);

        return this.crypto(userInput, name);
    },
    shuffle(array) {
        let currentIndex = array.length;
        let temporaryValue = null;
        let randomIndex = null;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[ currentIndex ];
            array[ currentIndex ] = array[ randomIndex ];
            array[ randomIndex ] = temporaryValue;
        }

        return array;
    },
    crypto(value, itemName) {

        value = String(String(Math.floor(value * 2)) + String(itemName.substring(0, 2)) + Number(Math.floor(value * 6)));
        value = value.toLowerCase();

        const list = "abcdefghijklmnopqrstuvwxyz0123456789";

        const key = ["8j8j", "2dfd", "0axt", "q9jf", "l8aj", "sm4i", "b9ks", "v2f9", "39jd", "59fj", "xjs9", "ydj9", "92jf", "psj8", "jdlj", "csk9", "413j", "1cib", "oas3", "ism8", "r2j3", "aim3", "daj3", "zam3", "w9k2", "h6ja", "mvb3", "62jf", "u8h3", "g3am", "kaj8", "fsk3", "7nnv", "ndj2", "tdj2", "e93h"];

        const encrypt = [];

        for (const i in value) {
            if (value[ i ]) {
                const character = value[ i ];

                const index = list.indexOf(character);

                if (index !== -1) {
                    let encryptValue = key[ index ];

                    if (!key[ index ]) {
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

export default util;