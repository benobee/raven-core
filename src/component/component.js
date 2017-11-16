import morphdom from 'morphdom';

class RavenComponent {
    constructor(componentName, options) {
        this.componentName = componentName;

        if (!options.isTemplate) {
            this.el = options.el;
            this.data = options.data();
            this.node = options.html;

            if (options.helpers) {
                for (const method in options.helpers) {
                    if (method) {
                        this[ `_${method}` ] = options.helpers[ method ];
                    }
                }
            }

            if (options.methods) {
                for (const method in options.methods) {
                    if (method) {
                        this[ `$${method}` ] = options.methods[ method ];
                    }
                }
            }

            this.ravenComponent = true;
        }
    }
    render() {
        this.parentAttributes = {};
        this.node = this.parseHTML(this.node, this.data);
        const VDOM = document.createElement("body");

        // search for the component element by name
        const target = document.querySelectorAll(this.el);

        // for each of the components render the html
        target.forEach((item, index) => {
            // create parent div for injection
            let node = document.createElement('div');
            // get the attriutes for the parent node and transfer

            for (let value in item.attributes) {
                if (item.attributes) {
                    const name = item.attributes[ value ].name;

                    value = item.attributes[ value ].value;

                    if (value) {
                        this.parentAttributes[ name ] = value;
                    }
                }
            }

            // set the inner html of the cloned node and inject the html
            node.innerHTML = this.node;           
            node = node.children[ 0 ];
            VDOM.appendChild(node);

            const itemParentNode = item.parentNode;

            //look for unique attributes to render or filter particular items
            node = this.parseAttributes(VDOM);

            //console.log(node);

            node = this.bindEvents(node);

            this.node = node;
            delete this.el;

            //replace the starting node with the newly compiled DOM component
            itemParentNode.replaceChild(node, item);
        });
    }
    mapAttributes(array, node) {
        const results = [];

        array.forEach((attr) => {
            const hasAttr = node.querySelectorAll(`[${attr}]`);

            hasAttr.forEach((item) => {
                results.push({ node: item, type: attr, value: item.attributes[ attr ].value });
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
            "touchstart",
            "touchend",
            "touchmove",
            "submit",
            "reset",
            "transitionstart",
            "transitioncancel",
            "transitionend",
            "transitionrun",
            "animationstart",
            "animationend",
            "animationiteration",
            "pagehide",
            "pageshow",
            "popstate",
            "focus",
            "blur",
            "cached",
            "error",
            "abort",
            "load",
            "loadstart",
            "beforeunload",
            "fullscreenchange",
            "fullscreenerror",
            "resize",
            "scroll",
            "keydown",
            "keypress",
            "keyup",
            "dragstart",
            "drag",
            "dragend",
            "dragenter",
            "dragover",
            "dragleave",
            "drop",
            "change"
        ], clone);

        attributes.forEach((attribute) => {
            const match = attribute.value.match(/ *\([^)]*\) */g, "")[ 0 ].replace("(", "").replace(")", "");

            const methodName = attribute.value.replace(/ *\([^)]*\) */g, "");

            attribute.node.removeAttribute(attribute.type);
            attribute.node.addEventListener(attribute.type, (e) => {
                this[ `$${methodName}` ](match);
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

                const listData = this.data[ parse[ 1 ] ];

                //remove the attribute from the DOM
                attribute.node.removeAttribute(attribute.type);

                //matching the string with the data and returning as real DOM node
                let nodeHTML = attribute.node.children[ 0 ].outerHTML;

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
                    const str = "{" + parse[ 0 ] + "." + prop + "}";

                    itemHTML = itemHTML.split(str).join(item[ prop ]);
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
            if (str[ 0 ] === "id") {
                search = this.id;
                results = true;
                return search;
            }
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

export default RavenComponent;