var Errors;
(function (Errors) {
    class InvalidOperationError extends Error {
        constructor(message) {
            super(message);
            this.name = "InvalidOperationError";
        }
    }
    Errors.InvalidOperationError = InvalidOperationError;
    class NameError extends Error {
        constructor(message) {
            super(message);
            this.name = "NameError";
        }
    }
    Errors.NameError = NameError;
    class IndexError extends Error {
        constructor(message) {
            super(message);
            this.name = "IndexError";
        }
    }
    Errors.IndexError = IndexError;
    class KeyError extends Error {
        constructor(message) {
            super(message);
            this.name = "KeyError";
        }
    }
    Errors.KeyError = KeyError;
    class AssertionError extends Error {
        constructor(message) {
            super(message);
            this.name = "AssertionError";
        }
    }
    Errors.AssertionError = AssertionError;
})(Errors || (Errors = {}));
export default Errors;
