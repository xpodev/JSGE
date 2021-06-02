module Errors {
    class BaseError extends Error {
        constructor(message: string) {
            super(message);
            this.name = this.constructor.name;
        }
    }

    export class InvalidOperationError extends BaseError {

    }

    export class NameError extends BaseError {

    }

    export class IndexError extends BaseError {

    }

    export class KeyError extends BaseError {

    }

    export class AssertionError extends BaseError {

    }

}

export default Errors;