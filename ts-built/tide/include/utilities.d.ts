declare module Utilities {
    function areOfType<T>(obj: any[], cls: Constructor<T>, raiseError?: boolean): boolean;
    function isOfType<T>(obj: any, cls: Constructor<T>, raiseError?: boolean): boolean;
    function defineCustomObject(tagName: string, elementClass?: any): void;
    type Constructor<T> = {
        new (...args: any[]): T;
    };
}
export default Utilities;
