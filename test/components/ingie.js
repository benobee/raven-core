import html from "./person.html";

const ingie = {
	node: "#ingie",
	html,
	data () {
		return {
			name: "Ingie",
			age: "35",
			classNames: {
				isActive: "active",
				isHidden: "hidden"
			},
			list: [1, 2, 3, 4, 5]
		};
	}
};

export default ingie;