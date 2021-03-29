var Utilities;
(function (Utilities) {
    function isType(obj, cls, raiseError = false) {
        if (obj instanceof cls || obj.prototype instanceof cls) {
            return true;
        }
        else if (raiseError) {
            throw new TypeError(`'${obj}' is not valid ${cls.name}`);
        }
        return false;
    }
    Utilities.isType = isType;
})(Utilities || (Utilities = {}));
export default Utilities;
