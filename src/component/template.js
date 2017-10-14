import morphdom from 'morphdom';
import util from './util';

/* 
 * shorthand template literal deconstruction
 * for simple components
 */

class Template {
    constructor(strings, ...exp) {
        this.componentLiteral = true;
        this.node = {};
        this.staticHTML = '';
        this.state = {};

        let html = '';

        if (Array.isArray(strings) && exp) {
            html = util.templateToString(strings, exp);

            this.node = util.toHTMLElement(html);

            //search for helpers
            util.parsePropsHelpers(this.node);

            this.node.childNodes.forEach((node) => {
                util.parsePropsHelpers(node);
            });

            this.staticHTML = util.formatString(this.node.outerHTML);
        }
    }
    render(target, callback) {

        /* 
         * declaritive method for appending a Component to the DOM
         */

        const type = (typeof target);

        if (type === "string") {

            target = document.querySelectorAll(target);

            target.forEach((node) => {
                const clone = this.controller.state.node.cloneNode(true);

                node.appendChild(clone);
            });

        } else if (type === "object") {
            if (target instanceof HTMLElement) {
                target = [target];
            }
            target.forEach((node) => {
                this.node.appendChild(node);
            });
        } else {
            console.error("COMPONENT ERROR: Needs to be a valid DOM element or string selector.");
        }

        //optional callback
        if (callback) {
            callback(this.node);
        }

        return this;
    }
}

export default Template;