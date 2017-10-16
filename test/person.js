import html from "./person.html";
import Raven from "../src/core/core";

Raven.component('person', {
	node: "#main",
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