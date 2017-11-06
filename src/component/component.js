import morphdom from 'morphdom';

class Component {
    constructor(componentName, options) {
        this.componentName = componentName;
        this.node = options.node;
        this.data = options.data();
        this.html = options.html;
    }
    render() {
        this.html = this.parseHTML(this.html);

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
            this.parseAttributes(this.html);
            item.outerHTML = this.html;
        });
    }
    parseAttributes(html) {
        const match = html;
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

                value = this.getResults(split, this.data);
                html = html.substr(0, item.index) + value + html.substr(item.index + item.length, html.length);

                return item;
            });
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