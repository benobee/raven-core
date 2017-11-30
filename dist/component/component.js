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

var RavenComponent = function () {
    function RavenComponent(componentName, options) {
        _classCallCheck(this, RavenComponent);

        this.componentName = componentName;

        if (!options.isTemplate) {
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
    }

    _createClass(RavenComponent, [{
        key: 'getParentAttributes',
        value: function getParentAttributes(target) {
            /**
             * Parses attributes and stores them from parent node
             *
             * @param {Object} target any node
             * @name getParentAttributes
             */

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
    }, {
        key: 'compileHTML',
        value: function compileHTML(target, template, data) {
            /**
             * This method compiles html as well as executes various
             * methods to 
             *
             * @param {Object} target any node
             * @name compileHTML 
             */

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
    }, {
        key: 'render',
        value: function render(node, target) {
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
    }, {
        key: 'convertStringToNode',
        value: function convertStringToNode(input) {
            /**
             * Determines if the traget is a string selector or an actual 
             * DOM element and renders it to the DOM.
             *
             * @param {Object} input any node
             * @returns {Object} actual DOM node
             * @name convertStringToNode 
             */

            var type = typeof input === 'undefined' ? 'undefined' : _typeof(input);

            if (type === "string") {
                input = document.querySelector(input);
            }

            return input;
        }
    }, {
        key: 'update',
        value: function update(props) {
            /**
             * Updates the rendered element using DOM diffing
             * via morphom.
             *
             * @param {Object} props any new data that matches the current
             * @name update 
             */

            Object.assign(this.data, props);
            (0, _morphdom2.default)(this.el, this.compileHTML(this.target, this.template, this.data));
        }
    }, {
        key: 'mapAttributes',
        value: function mapAttributes(array, node) {

            /**
             * Looks through the existing event array to see if the 
             * template has any declared to be used.
             * 
             * @param {Object} array
             * @param {Object} node
             * @returns {results} any matched attributes
             */

            var results = [];

            array.forEach(function (attr) {
                var hasAttr = node.querySelectorAll('[' + attr + ']');

                hasAttr.forEach(function (item) {
                    results.push({ node: item, type: attr, value: item.attributes[attr].value });
                });
            });

            return results;
        }
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
    }, {
        key: 'parseHTML',
        value: function parseHTML(html, data) {
            var _this3 = this;

            if (html && data) {
                // search for variables inside brackets
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
    }, {
        key: 'formatString',
        value: function formatString(str) {
            return str.replace(/[\n\r{}\s{1,10}]+/g, '');
        }
    }, {
        key: 'formatHTML',
        value: function formatHTML(str) {

            /*
             * remove all whitespace, tabs and return lines from string
             */

            str = str.replace(/[\n\r]+/g, '').replace(/\s{2,10}/g, '');
            return str;
        }
    }]);

    return RavenComponent;
}();

exports.default = RavenComponent;