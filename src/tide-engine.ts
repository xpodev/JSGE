import * as tide from './tide-engine.js';
import { Scene2D } from './tide/modules/scene.js';
export const DEFAULT_SCENE = new Scene2D("Scene1");

for (const obj in tide) {
    window[obj] = tide[obj];
}

document.querySelector('html').style.height = "100%";
document.querySelector('html').style.margin = "0";
document.body.style.height = "100%";
document.body.style.margin = "0";


DEFAULT_SCENE.activate();