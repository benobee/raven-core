import Raven from "../src/core/core";
import ingie from "./components/ingie";
import ben from "./components/ben";
import html from "./components/person.html";

Raven.component('person', {
	template: html
});

Raven.init({
	components: [
		Raven.component('person', ben)
	]
});

console.log(Raven);

let count = 39;

setInterval(() => {
	Raven.components.update({ id: "62jfg3am62jfkaj8" }, { age: count++ } );
}, 500);