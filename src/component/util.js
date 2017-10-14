/* 
 * useful methods for construction and deconstructing
 * strings and DOM elements.
 */

const util = {
    formatString(str) {

        /*
         * remove all whitespace, tabs and return lines from string
         */

        str = str.replace(/[\n\r]+/g, '').replace(/\s{2,10}/g, '');

        //const match = str.match(/<[^>]*>/g);

        return str;
    }
};

export default util;