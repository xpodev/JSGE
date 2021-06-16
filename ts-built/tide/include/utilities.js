var Utilities;
(function (Utilities) {
    class BaseElement extends HTMLElement {
    }
    function areOfType(obj, cls, raiseError = false) {
        for (const value of obj) {
            if (value instanceof cls || value.prototype instanceof cls || toString.call(value) == '[object ' + cls.name + ']') {
            }
            else if (raiseError) {
                throw new TypeError(`Member '${value}' in '${obj}' is not valid '${cls.name}'`);
            }
            else {
                return false;
            }
        }
        return true;
    }
    Utilities.areOfType = areOfType;
    function isOfType(obj, cls, raiseError = false) {
        if (obj instanceof cls || obj.prototype instanceof cls || toString.call(obj) == '[object ' + cls.name + ']') {
            return true;
        }
        else if (raiseError) {
            throw new TypeError(`'${obj}' is not valid '${cls.name}'`);
        }
        return false;
    }
    Utilities.isOfType = isOfType;
    function defineCustomObject(tagName, elementClass = BaseElement) {
        if (!(typeof elementClass == "function")) {
            throw new TypeError(`'${elementClass.name}' is not a class`);
        }
        if (!(elementClass.prototype instanceof HTMLElement)) {
            throw new TypeError(`'${elementClass.name}' does not derive from HTMLElement`);
        }
        if (elementClass === BaseElement) {
            elementClass = class extends BaseElement {
            };
        }
        customElements.define(tagName.toLowerCase(), elementClass);
    }
    Utilities.defineCustomObject = defineCustomObject;
})(Utilities || (Utilities = {}));
export default Utilities;
