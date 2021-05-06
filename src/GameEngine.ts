import { Scene2D } from "./JSGE/modules/JSGE.Scene.js";

export { default as Math } from "./JSGE/include/JSGE.Math.js";
export { default as Errors } from "./JSGE/include/JSGE.Errors.js";
export { default as Utilities } from "./JSGE/include/JSGE.Utilities.js";
export { default as Input } from "./JSGE/include/JSGE.Input.js";

export { default as UI } from "./JSGE/modules/JSGE.UI.js";
export { default as GameObject } from "./JSGE/modules/JSGE.GameObject.js";
export { Scene2D, Scene3D } from "./JSGE/modules/JSGE.Scene.js";

document.querySelector('html').style.height = "100%";
document.querySelector('html').style.margin = "0";
document.body.style.height = "100%";
document.body.style.margin = "0";

export const DEFAULT_SCENE = new Scene2D("Scene1");

DEFAULT_SCENE.activate();