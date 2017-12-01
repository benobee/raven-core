'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _morphdom = require('morphdom');

var _morphdom2 = _interopRequireDefault(_morphdom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @name RavenComponent
 */

var RavenComponent = function () {
    function RavenComponent(componentName, options) {
        _classCallCheck(this, RavenComponent);

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
     * @memberof RavenComponent
     * @private
     */

    _createClass(RavenComponent, [{
        key: 'executeComponent',
        value: function executeComponent(options) {
            this.target = options.el;
            this.data = options.data();
            this.template = options.html;
            this.el = this.compileHTML(this.convertStringToNode(options.el), this.template, this.data);

            // get the attriutes for the parent node and transfer
            this.props = this.getParentAttributes(options.el);

            if (options.helpers) {
                for (var method in options.helpers) {
                    if (method) {
                        this['$' + method] = options.helpers[method];
                    }
                }
            }

            if (options.methods) {
                for (var _method in options.methods) {
                    if (_method) {
                        this['' + _method] = options.methods[_method];
                    }
                }
            }

            this.ravenComponent = true;
        }

        /**
         * Parses attributes and stores them from parent node
         * @param {Object} target any node
         * @memberof RavenComponent
         * @private
         */

    }, {
        key: 'getParentAttributes',
        value: function getParentAttributes(target) {

            var props = {};

            for (var value in target.attributes) {
                if (target.attributes) {
                    var name = target.attributes[value].name;

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
         * @memberof RavenComponent
         * @private
         */

    }, {
        key: 'compileHTML',
        value: function compileHTML(target, template, data) {
            // create parent div for injection
            var node = document.createElement('div');

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
         * @memberof RavenComponent
         * @private
         */

    }, {
        key: 'render',
        value: function render(node, target) {
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
         * @memberof RavenComponent
         * @private
         */

    }, {
        key: 'convertStringToNode',
        value: function convertStringToNode(input) {

            var type = typeof input === 'undefined' ? 'undefined' : _typeof(input);

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
         * @memberof RavenComponent
         * @private
         */

    }, {
        key: 'update',
        value: function update(props) {
            Object.assign(this.data, props);
            (0, _morphdom2.default)(this.el, this.compileHTML(this.target, this.template, this.data));
        }

        /**
         * Looks through the existing event array to see if the 
         * template has any declared to be used.
         * 
         * @param {Array} array
         * @param {HTMLHtmlElement} node
         * @returns {results} any matched attributes
         * @memberof RavenComponent
         * @private
         */

    }, {
        key: 'mapAttributes',
        value: function mapAttributes(array, node) {
            var results = [];

            array.forEach(function (attr) {
                var hasAttr = node.querySelectorAll('[' + attr + ']');

                hasAttr.forEach(function (item) {
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
         * @memberof RavenComponent
         * @private
         */

    }, {
        key: 'bindEvents',
        value: function bindEvents(node) {
            var _this = this;

            var clone = node.cloneNode(true);

            var attributes = this.mapAttributes(["click", "mouseenter", "mouseleave", "mouseover", "mouseout", "mouseover", "submit", "transitionstart", "transitionend", "animationiteration", "focus", "change"], clone);

            attributes.forEach(function (attribute) {
                var match = null;

                match = attribute.value.match(/ *\([^)]*\) */g, "");

                if (match) {
                    match = match[0].replace("(", "").replace(")", "");
                }

                var methodName = attribute.value.replace(/ *\([^)]*\) */g, "");

                attribute.node.removeAttribute(attribute.type);
                attribute.node.addEventListener(attribute.type, function (e) {
                    _this['' + methodName](match);
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
         * @memberof RavenComponent
         * @private
         */

    }, {
        key: 'parseAttributes',
        value: function parseAttributes(node) {
            var _this2 = this;

            var clone = node.cloneNode(true);
            var attributes = this.mapAttributes(["repeat"], clone);

            attributes.forEach(function (attribute) {
                if (attribute.type === "repeat") {
                    //getting the list value to match with the real data
                    var parse = attribute.value.split(" in ");

                    var listData = [];

                    if (_this2.data[parse[1]]) {
                        listData = _this2.data[parse[1]];
                    } else {
                        var list = _this2['$' + parse[1]];

                        if (list) {
                            listData = list();
                        }
                    }

                    //remove the attribute from the DOM
                    attribute.node.removeAttribute(attribute.type);

                    //matching the string with the data and returning as real DOM node
                    var nodeHTML = attribute.node.children[0].outerHTML;

                    nodeHTML = _this2.parseChild(nodeHTML, listData, parse);
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
         * @param {string} html
         * @param {Array} listData
         * @param {string} parse
         * @returns {Array} HTMLArray
         * @memberof RavenComponent
         * @private
         */

    }, {
        key: 'parseChild',
        value: function parseChild(html, listData, parse) {
            var HTMLArray = [];

            listData.forEach(function (item) {
                var itemHTML = html;

                for (var prop in item) {
                    if (prop) {
                        var str = "{" + parse[0] + "." + prop + "}";

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
         * @param {string} str
         * @param {Object} obj
         * @returns {string} search
         * @memberof RavenComponent
         * @private
         */

    }, {
        key: 'findReturnableValues',
        value: function findReturnableValues(str, obj) {
            var results = false;
            var search = "";
            var searchIndex = 0;

            while (!results) {
                if (str[0] === "id") {
                    search = this.id;
                    results = true;
                    return search;
                }
                search = obj = obj[str[searchIndex]];

                if ((typeof search === 'undefined' ? 'undefined' : _typeof(search)) === "object") {
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
         * @param  {string} html && {Object} data object literal data structure
         * @returns {string} Returns the compiled and formatted HTML based on the data
         * @memberof RavenComponent
         * @private
         */

    }, {
        key: 'parseHTML',
        value: function parseHTML(html, data) {
            var _this3 = this;

            if (html && data) {

                var matches = html.match(/{[^}]*}/g);

                if (matches) {
                    matches = matches.map(function (item) {
                        item = {
                            str: _this3.formatString(item),
                            index: html.indexOf(item),
                            length: item.length
                        };
                        var split = item.str.split(".");

                        var value = "";

                        value = _this3.findReturnableValues(split, data);

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
         * @param {string} str
         * @returns {string} returns formatted string
         * @memberof RavenComponent
         * @private
         */

    }, {
        key: 'formatString',
        value: function formatString(str) {
            return str.replace(/[\n\r{}\s{1,10}]+/g, '');
        }

        /**
         * remove all whitespace, tabs and return lines from string
         * @param {string} str any string
         * @returns formatted HTML
         * @memberof RavenComponent
         * @private
         */

    }, {
        key: 'formatHTML',
        value: function formatHTML(str) {
            return str.replace(/[\n\r]+/g, '').replace(/\s{2,10}/g, '');
        }
    }]);

    return RavenComponent;
}();

exports.default = RavenComponent;