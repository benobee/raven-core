const component = {
    el: ".person.ingie",
    data() {
        return {
            name: "Ingie",
            age: "35",
            classNames: {
                isActive: "active",
                isHidden: "hidden"
            },
            list: [{
                    type: "pillow",
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
    },
    helpers: {
        notify() {
            console.log("notifying");
        }
    },
    methods: {
        handleClick(value) {
            console.log("handling event:", value);
        },
        loadStart() {
            console.log("loading");
        },
        loadEnd() {
            console.log("load complete");
        }
    }
};

export default component;