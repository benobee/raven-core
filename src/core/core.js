import Component from "../component/component";
import util from "../util/util";

class Raven {
    constructor() {
        if (!Raven.instance) {
            this.componentList = [];

            Raven.instance = this;
        }

        return this;
    }
    component(componentName, config) {
        // Component factory method
        const component = new Component(componentName, config);

        this.componentList.push(component);

        this.componentList.map((item, index) => {
            item.data.id = util._id(index + 1, componentName);
        });

        this.render();

        return component;
    }
    helpers() {

    }
    methods() {

    }
    render() {
        if (this.componentList.length > 0) {
            this.componentList.forEach((item) => {
                item.render();
            });
        }
    }
}

const instance = new Raven();

Object.freeze(instance);

export default instance;