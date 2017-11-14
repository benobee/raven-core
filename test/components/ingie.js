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
    },
    events: {
        handleClick() {
            console.log("handling click");
        }
    }
};

export default component;