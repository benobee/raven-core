const component = {
    el: ".ingie",
    data() {
        return {
            name: "Ingie",
            age: "39",
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
    methods: {
        handleClick(prop) {
            this.notify(prop);
        },
        notify(message) {
            console.log("notifying: ", message);
        }
    }
};

export default component;