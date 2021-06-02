declare module Errors {
    class BaseError extends Error {
        constructor(message: string);
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
    export {};
}
export default Errors;
