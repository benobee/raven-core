import morphdom from 'morphdom';

class Component {
    constructor(componentName, options) {
        this.componentName = componentName;
        this.node = options.node;
        this.data = options.data();
        this.html = options.html;
    }
    render() {
        this.html = this.parseHTML(this.html, this.data);

        // create parent div for injection
        const div = document.createElement('div');

        // search for the component element by name
        const target = document.querySelectorAll(this.componentName);

        // for each of the components render the html
        target.forEach((item) => {
            const clone = div.cloneNode();

            // get the attriutes for the parent node and transfer
            for (let value in item.attributes) {
                if (item.attributes) {
                    const name = item.attributes[ value ].name;

                    value = item.attributes[ value ].value;

                    if (value) {
                        clone.setAttribute(name, value);
                    }
                }
            }

            // set the inner html of the cloned node and
            // inject the html
            clone.innerHTML = this.html;
            this.node = clone;
            this.html = this.formatHTML(clone.outerHTML);
            this.node = this.parseAttributes(this.node);
            item.outerHTML = this.node.outerHTML;
        });
    }
    parseAttributes(html) {
        const attributes = ["repeat", "bind"];
        const results = [];

        attributes.forEach((attr) => {
            const hasAttr = html.querySelectorAll(`[${attr}]`);

            hasAttr.forEach((item) => {
                results.push({ node: item, type: attr, value: item.attributes[ attr ].value });
            });
        });

        results.forEach((attribute) => {
            if (attribute.type === "repeat") {
                const parse = attribute.value.split(" in ");

                const listData = this.data[ parse[ 1 ] ];

                attribute.node.removeAttribute(attribute.type);

                let nodeHTML = attribute.node.children[ 0 ].outerHTML;

                nodeHTML = this.parseChild(nodeHTML, listData, parse);

                attribute.node.innerHTML = nodeHTML;
            }
        });

        return html;
    }
    parseChild(html, listData, parse) {
        const HTMLArray = [];

        listData.forEach((item) => {
            let itemHTML = html;

            for (const prop in item) {
                if (prop) {
                    const str = "{" + parse[ 0 ] + "." + prop + "}";

                    itemHTML = itemHTML.replace(str, item[ prop ]);
                }
            }

            HTMLArray.push(itemHTML);
        });

        return HTMLArray.join("");
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
    parseHTML(html, data) {
        if (html && data) {
            // search for variables inside brackets
            let matches = html.match(/{[^}]*}/g);

            if (matches) {
                matches = matches.map((item) => {
                    item = {
                        str: this.formatString(item),
                        index: html.indexOf(item),
                        length: item.length
                    };

                    let value = "";

                    const split = item.str.split(".");

                    value = this.getResults(split, data);

                    if (value) {
                        html = html.substr(0, item.index) + value + html.substr(item.index + item.length, html.length);
                    }

                    return item;
                });
            }
        }

        return this.formatHTML(html);
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