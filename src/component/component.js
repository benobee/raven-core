import Template from './template';
import morphdom from 'morphdom';
import util from './util';

class Component {
    constructor(componentName, options) {
        this.template = options.template;
        this.data = options.data();
        this.initNode(componentName, options.type);
    }
    initNode(componentName, elementType) {

        if (!elementType) {
            elementType = "div";
        }

        const div = document.createElement(elementType);

        const target = document.querySelectorAll(componentName);

        target.forEach((item) => {
            const html = this.parseHTML(item.innerHTML);
            const clone = div.cloneNode();

            for (let value in item.attributes) {
                if (item.attributes) {
                    const name = item.attributes[ value ].name;

                    value = item.attributes[ value ].value;

                    if (value) {
                        clone.setAttribute(name, value);
                    }
                }
            }

            clone.innerHTML = html;
            this.$el = clone;
            this.html = this.formatHTML(clone.outerHTML);
            item.outerHTML = this.html;
        });
    }
    getResults(str, obj) {
        let results = false;
        let search = "";
        let searchIndex = 0;

        while (!results) {
            search = obj = obj[ str[ searchIndex ] ];

            if (typeof search === "object") {
                searchIndex += 1;
            } else {
                results = true;

                return search;
            }
        }

        return results;
    }
    parseHTML(html) {
        let matches = html.match(/{[^}]*}/g);

        matches = matches.map((item) => {
            item = {
                str: this.formatString(item),
                index: html.indexOf(item),
                length: item.length
            };

            let value = "";

            const split = item.str.split(".");

            value = this.getResults(split, this.data);

            html = html.substr(0, item.index) + value + html.substr(item.index + item.length, html.length);

            return item;
        });

        return html;
    }
    formatString(str) {
        str = str.replace(/[\n\r]+/g, '')
            .replace(/\s{1,10}/g, '')
            .replace("{", "")
            .replace("}", "");

        return str;
    }
    formatHTML(str) {

        /*
         * remove all whitespace, tabs and return lines from string
         */

        str = str.replace(/[\n\r]+/g, '').replace(/\s{2,10}/g, '');

        return str;
    }
}

export default Component;