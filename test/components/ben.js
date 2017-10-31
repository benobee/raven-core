import html from "./person.html";
import app from "./app";

const ben = app.component({
	node: "#ben",
	html,
	data () {
		return {
			name: "Ben",
			age: "39",
			classNames: {
				isActive: "active",
				isHidden: "hidden"
			},
			list: [1, 2, 3, 4, 5]
		};
	}
});

export default ben;