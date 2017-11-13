import html from "./person.html";
import Raven from "../../src/core/core";

const ben = Raven.component('person', {
    el: ".person.ben",
    html,
    data() {
        return {
            name: "Ben",
            age: "39",
            classNames: {
                isActive: "active",
                isHidden: "hidden"
            },
            list: [{
                    type: "cat",
                    name: "Bobby Truth"
                },
                {
                    type: "dog",
                    name: "Billy Sour"
                },
                {
                    type: "fish",
                    name: "Judy Ditch"
                },
                {
                    type: "bird",
                    name: "Taylor Swank"
                }
            ]
        };
    }
});

const ingie = Raven.component('person', {
    el: ".person.ingie",
    html,
    data() {
        return {
            name: "Ingie",
            age: "35",
            classNames: {
                isActive: "active",
                isHidden: "hidden"
            },
            list: [{
                    type: "cat",
                    name: "Bobby Brown"
                },
                {
                    type: "dog",
                    name: "Willy Smith"
                },
                {
                    type: "fish",
                    name: "Judy Dench"
                },
                {
                    type: "bird",
                    name: "Taylor Swift"
                }
            ]
        };
    }
});

export {
    ben,
    ingie
};