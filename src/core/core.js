import Events from '../events/events';
import Util from '../util/util';

class App_Build {
	constructor() {
		this.extend(Events);
		this.extend(Util);
	}
	extend(obj) {
		Object.assign(this, obj);
	}
	methods(func) {
		Object.assign(this, func);
	}
	call(methodName, ...args) {
		const props = args[ 0 ];
		
		this[ methodName ].call(this[ methodName ], props);

		//callback
		if (typeof (args[ args.length - 1]) === "function") {
			args[ args.length - 1 ].call(props, props);
		}
	}
}

const Raven = new App_Build();

export default Raven;