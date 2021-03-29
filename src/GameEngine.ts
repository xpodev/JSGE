export { default as Math } from "./JSGE/include/JSGE.Math.js";
export { default as Errors } from "./JSGE/include/JSGE.Errors.js";
export { default as Utilities } from "./JSGE/include/JSGE.Utilities.js";

export { default as UI } from "./JSGE/modules/JSGE.UI.js";
export { default as GameObject } from "./JSGE/modules/JSGE.GameObject.js";


// class Class { }

// /** 
//  * Optional, lets you use the classes inside the given in global scope
//  * 
//  * Example: 
//  * `JSGE.GameObject.rename` function can be called as `GameObject.rename()` without the `JSGE` module name.
//  *  
//  * @param {class} cls the imported class module
//  */
// export const addToGlobal = (cls: typeof Class): void => {
//     for (const prop in cls) {
//         window[prop] = cls[prop];
//     }
// };