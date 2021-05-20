declare module Utilities {
    function areOfType<T>(obj: any[], cls: Interface<T>, raiseError?: boolean): boolean;
    function isOfType<T>(obj: any, cls: Interface<T>, raiseError?: boolean): boolean;
    function defineCustomObject(tagName: string, elementClass?: any): void;
    type Interface<T> = {
        new (...args: any[]): T;
    };
}
export default Utilities;
