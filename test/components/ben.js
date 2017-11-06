import html from "./person.html";
import Raven from "../../src/core/core";

const ben = Raven.component('person', {
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