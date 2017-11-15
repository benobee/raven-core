import Raven from "../src/core/core";
import ingie from "./components/ingie";
import ben from "./components/ben";
import html from "./components/person.html";

Raven.component('person', {
	template: html
});

Raven.init({
	components: [
		Raven.component('person', ben),
		Raven.component('person', ingie)
	]
});

console.log(Raven);