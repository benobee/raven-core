import Component from "../component/component";

const Raven = (options) => {
    return {
    	options,
        componentList: [],
        component(componentName, config) {
            // Component factory method
            const component = new Component(componentName, config);

            this.componentList.push(component);

            return component;
        }
    };
};

export default Raven;