declare module Errors {
    class InvalidOperationError extends Error {
        constructor(message: string);
    }
    class NameError extends Error {
        constructor(message: string);
    }
    class IndexError extends Error {
        constructor(message: string);
    }
    class KeyError extends Error {
        constructor(message: string);
    }
    class AssertionError extends Error {
        constructor(message: string);
    }
}
export default Errors;
