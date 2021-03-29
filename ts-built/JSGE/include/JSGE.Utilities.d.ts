declare module Utilities {
    function areOfType(obj: any[], cls: any, raiseError?: boolean): boolean;
    function isOfType(obj: any, cls: any, raiseError?: boolean): boolean;
    function defineCustomObject(tagName: any, elementClass?: any): void;
}
export default Utilities;
