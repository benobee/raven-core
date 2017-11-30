import morphdom from 'morphdom';

class RavenComponent {
    constructor(componentName, options) {
        this.componentName = componentName;

        if (!options.isTemplate) {
            this.target = options.el;
            this.data = options.data();
            this.template = options.html;
            this.el = this.compileHTML(this.convertStringToNode(options.el), this.template, this.data);
            // get the attriutes for the parent node and transfer
            this.props = this.getParentAttributes(options.el);

            if (options.helpers) {
                for (const method in options.helpers) {
                    if (method) {
                        this[`$${method}`] = options.helpers[method];
                    }
                }
            }

            if (options.methods) {
                for (const method in options.methods) {
                    if (method) {
                        this[`${method}`] = options.methods[method];
                    }
                }
            }

            this.ravenComponent = true;
        }
    }
    getParentAttributes(target) {
        /**
         * Parses attributes and stores them from parent node
         *
         * @param {Object} target any node
         * @name getParentAttributes
         */

        const props = {};

        for (let value in target.attributes) {
            if (target.attributes) {
                const name = target.attributes[value].name;

                value = target.attributes[value].value;

                if (value) {
                    props[name] = value;
                }
            }
        }

        return props;
    }
    compileHTML(target, template, data) {
        /**
         * This method compiles html as well as executes various
         * methods to 
         *
         * @param {Object} target any node
         * @name compileHTML 
         */

        // create parent div for injection
        let node = document.createElement('div');

        // set the inner html of the cloned node and inject the html
        node.innerHTML = this.parseHTML(template, data);
        node = node.children[0];

        // look for unique attributes to render or filter particular items
        node = this.parseAttributes(node);
        node = this.bindEvents(node);

        return node;
    }
    render(node, target) {
        /**
         * Determines if the traget is a string selector or an actual 
         * DOM element and renders it to the DOM.
         *
         * @param {Object} node any node
         * @param {Object} target any node
         * @name render 
         */

        // replace the starting node with the newly compiled DOM component
        target = this.convertStringToNode(target);
        target.parentNode.replaceChild(node, target);
    }
    convertStringToNode(input) {
        /**
         * Determines if the traget is a string selector or an actual 
         * DOM element and renders it to the DOM.
         *
         * @param {Object} input any node
         * @returns {Object} actual DOM node
         * @name convertStringToNode 
         */

        const type = (typeof input);

        if (type === "string") {
            input = document.querySelector(input);
        }

        return input;
    }
    update(props) {
        /**
         * Updates the rendered element using DOM diffing
         * via morphom.
         *
         * @param {Object} props any new data that matches the current
         * @name update 
         */
        
        Object.assign(this.data, props);
        morphdom(this.el, this.compileHTML(this.target, this.template, this.data));
    }
    mapAttributes(array, node) {

        /**
         * Looks through the existing event array to see if the 
         * template has any declared to be used.
         * 
         * @param {Array} array
         * @param {Object} node
         * @returns {results} any matched attributes
         */
        
        const results = [];

        array.forEach((attr) => {
            const hasAttr = node.querySelectorAll(`[${attr}]`);

            hasAttr.forEach((item) => {
                results.push({ node: item, type: attr, value: item.attributes[attr].value });
            });
        });

        return results;
    }
    bindEvents(node) {
        const clone = node.cloneNode(true);

        const attributes = this.mapAttributes([
            "click",
            "mouseenter",
            "mouseleave",
            "mouseover",
            "mouseout",
            "mouseover",
            "submit",
            "transitionstart",
            "transitionend",
            "animationiteration",
            "focus",
            "change"
        ], clone);

        attributes.forEach((attribute) => {
            let match = null;

            match = attribute.value.match(/ *\([^)]*\) */g, "");

            if (match) {
                match = match[0].replace("(", "").replace(")", "");
            }

            const methodName = attribute.value.replace(/ *\([^)]*\) */g, "");

            attribute.node.removeAttribute(attribute.type);
            attribute.node.addEventListener(attribute.type, (e) => {
                this[`${methodName}`](match);
            });
        });

        return clone;
    }
    parseAttributes(node) {
        const clone = node.cloneNode(true);
        const attributes = this.mapAttributes(["repeat"], clone);

        attributes.forEach((attribute) => {
            if (attribute.type === "repeat") {
                //getting the list value to match with the real data
                const parse = attribute.value.split(" in ");

                let listData = [];

                if (this.data[parse[1]]) {
                    listData = this.data[parse[1]];
                } else {
                    const list = this[`$${parse[ 1 ]}`];

                    if (list) {
                        listData = list();
                    }
                }

                //remove the attribute from the DOM
                attribute.node.removeAttribute(attribute.type);

                //matching the string with the data and returning as real DOM node
                let nodeHTML = attribute.node.children[0].outerHTML;

                nodeHTML = this.parseChild(nodeHTML, listData, parse);
                attribute.node.innerHTML = nodeHTML;
                clone.appendChild(attribute.node);
            }
        });

        return clone;
    }
    parseChild(html, listData, parse) {
        let HTMLArray = [];

        listData.forEach((item) => {
            let itemHTML = html;

            for (const prop in item) {
                if (prop) {
                    const str = "{" + parse[0] + "." + prop + "}";

                    itemHTML = itemHTML.split(str).join(item[prop]);
                }
            }
            HTMLArray.push(itemHTML);
        });

        HTMLArray = HTMLArray.join("");

        return HTMLArray;
    }
    findReturnableValues(str, obj) {
        let results = false;
        let search = "";
        let searchIndex = 0;

        while (!results) {
            if (str[0] === "id") {
                search = this.id;
                results = true;
                return search;
            }
            search = obj = obj[str[searchIndex]];

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
                    const split = item.str.split(".");

                    let value = "";

                    value = this.findReturnableValues(split, data);

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
        return str.replace(/[\n\r{}\s{1,10}]+/g, '');
    }
    formatHTML(str) {

        /*
         * remove all whitespace, tabs and return lines from string
         */

        str = str.replace(/[\n\r]+/g, '').replace(/\s{2,10}/g, '');
        return str;
    }
}

export default RavenComponent;