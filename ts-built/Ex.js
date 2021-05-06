import * as JSGE from "./GameEngine.js";
import {Rect} from "./JSGE/modules/JSGE.GameObject.js";
import Input from "./JSGE/include/JSGE.Inputs.js";

const gObj = new Rect("a");
const gObj2 = new Rect("b");
JSGE.DEFAULT_SCENE.addGameObject(gObj);
gObj.width = 10;
gObj.height = 10;
gObj.position.set(90, 90);

JSGE.DEFAULT_SCENE.addGameObject(gObj2);
gObj2.width = 10;
gObj2.height = 10;
gObj2.position.set(10, 10);

gObj.bindKeyPress(Input.KeyCode.W, () => {
    gObj.position.translate(new JSGE.Math.Vector2(0, -5));
})

gObj2.bindKeyPress(Input.KeyCode.W, () => {
    gObj2.position.translate(new JSGE.Math.Vector2(0, -5));
})