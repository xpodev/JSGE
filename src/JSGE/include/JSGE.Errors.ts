module Errors {
    export class InvalidOperationError extends Error {
        constructor(message: string) {
            super(message);
            this.name = "InvalidOperationError";
        }
    }

    export class NameError extends Error {
        constructor(message: string) {
            super(message);
            this.name = "NameError";
        }
    }

    export class IndexError extends Error {
        constructor(message: string) {
            super(message);
            this.name = "IndexError";
        }
    }

    export class KeyError extends Error {
        constructor(message: string) {
            super(message);
            this.name = "KeyError";
        }
    }

    export class AssertionError extends Error {
        constructor(message: string) {
            super(message);
            this.name = "AssertionError";
        }
    }

}

export default Errors;