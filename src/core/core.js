import Events from '../events/events';
import Component from '../component/component';

class App_Build {
    constructor(obj) {
        this.events = Events;
        this.components = [];

        Object.assign(this, obj);

        this.on("app-loaded", () => {
            console.log("app-loaded: ", this);
        });

        this.emit("app-loaded");
    }
    on(event, listener) {
        this.events.on(event, listener);
    }
    emit(event, data) {
        this.events.emit(event, data);
    }
    component(type, options) {
        const component = new Component(type, options);

        this.components.push(component);

        return this;
    }
}

export default App_Build;