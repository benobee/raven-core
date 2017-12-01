import RavenComponent from "../component/component";
import util from "../util/util";

class Raven {
    constructor() {
        if (!Raven.instance) {
            this.events = {};
            this.history = [];
            this.components = {
                active: [],
                templates: [],
                find(props) {
                    return util.hasProps(this.active, props);
                },
                findOne(props) {
                    return util.hasProps(this.active, props)[0];
                },
                update(...props) {
                    const results = util.hasProps(this.active, props[0]);

                    results.forEach((item) => {
                        item.update(props[1]);
                    });
                }
            };

            this.on("appInitialized", (instance) => {
                //set instance
                instance.appInitialized = true;
                Raven.instance = instance;
            });

            this.on("componentListRegistered", () => {
                // if available components are registered they will be rendered
                if (this.components.active.length > 0) {
                    this.components.active.map((item, index) => {
                        item.id = util._id(index + 1);
                        if (item.el) {
                            item.render(item.el, item.target);
                        }
                    });
                }
            });
        }

        return this;
    }
    init(config) {
        for (const prop in config) {
            // look for config props
            if (prop === "components") {
                this.components.active = config[prop];
                this.emit("componentListRegistered");
            }
        }
    }
    on(event, listener) {
        // create the event if not yet created
        if (!this.events[event]) {
            this.events[event] = [];
        }

        // add the listener
        this.events[event].push(listener);
    }
    emit(event, data) {
        // return if the event doesn't exist, or there are no listeners
        if (!this.events[event] || this.events[event].length < 1) {
            return;
        }

        // send the event to all listeners
        this.events[event].forEach((listener) => listener(data || {}));
        this.history.push({ eventEmitted: event });
    }

    component(componentName, config) {
        /**
         * Component factory method
         * @param  {String} componentName Component name
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
        
        config.isTemplate = false;

        if (config.template && config.template !== componentName) {
            this.components.templates[componentName] = config;
            config.isTemplate = true;
        } else if (!config.html) {
            config.html = this.components.templates[componentName].template;
        }

        const component = new RavenComponent(componentName, config);

        return component;
    }
}

const instance = new Raven();

instance.emit("appInitialized", { instance, message: { appInitialized: true } });

export default instance;