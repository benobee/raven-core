import Raven from "../src/core/core";
import template from "./test.html";

const App = new Raven({
	methods: {
		have () {
			return "have";
		},
		fun () {
			return "fun";
		}
	}
});

const person = App.component('person', {
	template,
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

