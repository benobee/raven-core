import html from "./person.html";
import Raven from "../../src/core/core";

const ben = Raven.component('person', {
    node: "#ben",
    html,
    data() {
        return {
            name: "Ben",
            age: "39",
            classNames: {
                isActive: "active",
                isHidden: "hidden"
            },
            list: [{ type: "cat", name: "Bob" }, { type: "dog", name: "Willy" }, { type: "fish", name: "Julie" }, { type: "bird", name: "Taylor" }]
        };
    }
});

export default ben;