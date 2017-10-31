import Raven from "../src/core/core";

const app = new Raven({
	isActive: true
});

console.log(app);

export default app;