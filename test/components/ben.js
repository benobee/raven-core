const component = {
    el: ".person.ben",
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
    },
    methods: {
        handleClick() {
            console.log("handling event:", this.id);
        }
    }
};

export default component;