import Raven from "../src/core/core";
import person from "./person";

const App = new Raven({
	components: [
		person
	],
	methods: {
		have () {
			return "have";
		},
		fun () {
			return "fun";
		}
	}
});


