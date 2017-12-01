import morphdom from 'morphdom';

class RavenComponent {
    // class constructor method
    constructor(componentName, options) {
        this.componentName = componentName;

        // check if the component is a template or not 
        // if not, the regular component will be executed

        if (!options.isTemplate) {
            this.executeComponent(options);
        }
    }


    /**
     * All methods and variables from the initial options 
     * will be exceuted and stored accordingly. Making this
     * separate method of readability. 
     * 
     * @param {Object} options for the component
     * @private
     */

    executeComponent(options) {
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


    /**
     * Parses attributes and stores them from parent node
     * @param {Object} target any node
     * @private
     */

    getParentAttributes(target) {

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


    /**
     * This method compiles html as well as executes various
     * methods to 
     *
     * @param {HTMLHtmlElement} target any node
     * @returns {HTMLHtmlElement} node
     * @private
     */

    compileHTML(target, template, data) {
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


    /**
     * Determines if the traget is a string selector or an actual 
     * DOM element and renders it to the DOM.
     *
     * @param {HTMLHtmlElement} node
     * @param {HTMLHtmlElement} target
     * @private
     */

    render(node, target) {
        // replace the starting node with the newly compiled DOM component
        target = this.convertStringToNode(target);
        target.parentNode.replaceChild(node, target);
    }


    /**
     * Determines if the traget is a string selector or an actual 
     * DOM element and renders it to the DOM.
     *
     * @param {HTMLHtmlElement} input
     * @returns {HTMLHtmlElement} input
     * @private
     */

    convertStringToNode(input) {


        const type = (typeof input);

        if (type === "string") {
            input = document.querySelector(input);
        }

        return input;
    }

    /**
     * Updates the rendered element using DOM diffing
     * via morphom.
     *
     * @param {Object} props any new data that matches the current
     * @private
     */

    update(props) {
        Object.assign(this.data, props);
        morphdom(this.el, this.compileHTML(this.target, this.template, this.data));
    }

    /**
     * Looks through the existing event array to see if the 
     * template has any declared to be used.
     * 
     * @param {Array} array
     * @param {HTMLHtmlElement} node
     * @returns {results} any matched attributes
     * @private
     */

    mapAttributes(array, node) {
        const results = [];

        array.forEach((attr) => {
            const hasAttr = node.querySelectorAll(`[${attr}]`);

            hasAttr.forEach((item) => {
                results.push({ node: item, type: attr, value: item.attributes[attr].value });
            });
        });

        return results;
    }


    /**
     * All available events will be stored in this attributes
     * array for use in the component. More will be added over
     * time after testing.
     * 
     * @param {HTMLHtmlElement} node
     * @private
     */

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


    /**
     * This is for custom attributes in the component such as "repeat".
     * The method will search for the specified attribute and execute.
     * The reason is to provide a short hand way for custom functionality.
     * 
     * @param {HTMLHtmlElement} node
     * @returns {HTMLHtmlElement} clone
     * @private
     */

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


    /**
     * For generating lists, one child component is used as a
     * template to genearte all the other children with all their
     * own unqiue data points.
     * 
     * @param {String} html
     * @param {Array} listData
     * @param {String} parse
     * @returns {Array} HTMLArray
     * @private
     */

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


    /**
     * To match the string brackets with the data we will need
     * to iterate through the object to find returnable values.
     * 
     * @param {String} str
     * @param {Object} obj
     * @returns {String} search
     * @private
     */

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


    /**
     * Search for variables inside brackets
     * 
     * @param  {String} html && {Object} data object literal data structure
     * @returns {String} Returns the compiled and formatted HTML based on the data
     * @private
     */

    parseHTML(html, data) {
        if (html && data) {

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


    /**
     * @param {String} str
     * @returns {String} returns formatted string
     * @private
     */

    formatString(str) {
        return str.replace(/[\n\r{}\s{1,10}]+/g, '');
    }


    /**
     * remove all whitespace, tabs and return lines from string
     * @param {String} str any string
     * @returns formatted HTML
     * @private
     */
    
    formatHTML(str) {
        return str.replace(/[\n\r]+/g, '').replace(/\s{2,10}/g, '');
    }
}

export default RavenComponent;