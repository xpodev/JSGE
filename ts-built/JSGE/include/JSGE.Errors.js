var Errors;
(function (Errors) {
    class BaseError extends Error {
        constructor(message) {
            super(message);
            this.name = this.constructor.name;
        }
    }
    class InvalidOperationError extends BaseError {
    }
    Errors.InvalidOperationError = InvalidOperationError;
    class NameError extends BaseError {
    }
    Errors.NameError = NameError;
    class IndexError extends BaseError {
    }
    Errors.IndexError = IndexError;
    class KeyError extends BaseError {
    }
    Errors.KeyError = KeyError;
    class AssertionError extends BaseError {
    }
    Errors.AssertionError = AssertionError;
})(Errors || (Errors = {}));
export default Errors;
