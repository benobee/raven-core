"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = require("../component/component");

var _component2 = _interopRequireDefault(_component);

var _util = require("../util/util");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Singleton. 
 * 
 * @name Raven
 */

var Raven = function () {
    function Raven() {
        _classCallCheck(this, Raven);

        if (!Raven.instance) {
            this.executeInstance();
        }

        return this;
    }

    /**
     * Separated from constructor for readability. Sets up properties and
     * methods for core functionality. Event subscriptions are created.
     * 
     * @private
     */

    _createClass(Raven, [{
        key: "executeInstance",
        value: function executeInstance() {
            var _this = this;

            this.events = {};
            this.history = [];
            this.components = {
                active: [],
                templates: [],
                find: function find(props) {
                    return _util2.default.hasProps(this.active, props);
                },
                findOne: function findOne(props) {
                    return _util2.default.hasProps(this.active, props)[0];
                },
                update: function update() {
                    for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
                        props[_key] = arguments[_key];
                    }

                    var results = _util2.default.hasProps(this.active, props[0]);

                    results.forEach(function (item) {
                        item.update(props[1]);
                    });
                }
            };

            this.on("appInitialized", function (instance) {
                //set instance
                instance.appInitialized = true;
                Raven.instance = instance;
            });

            this.on("componentListRegistered", function () {
                // if available components are registered they will be rendered
                if (_this.components.active.length > 0) {
                    _this.components.active.map(function (item, index) {
                        item.id = _util2.default._id(index + 1);
                        if (item.el) {
                            item.render(item.el, item.target);
                        }
                    });
                }
            });
        }

        /**
         * The initialization options for the core instance.
         * @param  {Object} config the perfect place for registering components
         * 
         * @private
         */

    }, {
        key: "init",
        value: function init(config) {
            for (var prop in config) {
                // look for config props
                if (prop === "components") {
                    this.components.active = config[prop];
                    this.emit("componentListRegistered");
                }
            }
        }

        /**
         * PUB/SUB Pattern. Topic listener that triggers a callback when the 
         * particular topic is published.
         * 
         * @param  {string} event
         * @param  {Object} listener
         * @name Raven.on
         */

    }, {
        key: "on",
        value: function on(event, listener) {
            // create the event if not yet created
            if (!this.events[event]) {
                this.events[event] = [];
            }

            // add the listener
            this.events[event].push(listener);
        }

        /**
         * PUB/SUB Pattern.
         * @param  {string} event
         * @param  {Object} data
         * @name Raven.emit
         */

    }, {
        key: "emit",
        value: function emit(event, data) {
            // return if the event doesn't exist, or there are no listeners
            if (!this.events[event] || this.events[event].length < 1) {
                return;
            }

            // send the event to all listeners
            this.events[event].forEach(function (listener) {
                return listener(data || {});
            });
            this.history.push({ eventEmitted: event });
        }

        /**
         * Component factory method
         * @param  {string} componentName Component name
         * @param  {Object} config        Component configurations
         * @name Raven.component
         * @return {Object}               The custom component
         * @example 
         *     Raven.component("Button", {
         *         el: ".button", 
         *         data() {  
         *             return {
         *                 buttonName: 'button-click'
         *             }
         *         },
         *         methods: {
         *             buttonClick() {
         *                 alert("CLICKED");
         *             }
         *         }
         *     });
         */

    }, {
        key: "component",
        value: function component(componentName, config) {
            config.isTemplate = false;

            if (config.template && config.template !== componentName) {
                this.components.templates[componentName] = config;
                config.isTemplate = true;
            } else if (!config.html) {
                config.html = this.components.templates[componentName].template;
            }

            var component = new _component2.default(componentName, config);

            return component;
        }
    }]);

    return Raven;
}();

var instance = new Raven();

instance.emit("appInitialized", { instance: instance, message: { appInitialized: true } });

exports.default = instance;