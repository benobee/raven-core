import Events from '../events/events';

class App_Build {
	constructor() {
		this.extend(Events);

		this.core = {
			methods: {}
		};

		console.log(this);

		window.Raven = this;
	}
	extend(obj) {
		Object.assign(this, obj);
	}
	methods(func) {
		Object.assign(this.core.methods, func);
	}
	call(methodName, ...args) {
		const props = args[ 0 ];
		
		this.core.methods[ methodName ].call(this.core.methods[ methodName ], props);

		//callback
		if (typeof (args[ args.length - 1]) === "function") {
			args[ args.length - 1 ].call(props, props);
		}
	}
	onStartup(func) {
		if (func) {
			func();			
		}
	}
}

const Raven = new App_Build();

export default Raven;