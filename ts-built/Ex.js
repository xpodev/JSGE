import * as JSGE from "./GameEngine.js";
import { Rect } from "./JSGE/modules/JSGE.GameObject.js";
import Input from "./JSGE/include/JSGE.Inputs.js";
import { Collision2D } from "./JSGE/modules/JSGE.Component.js";

const gObj = new Rect("a");
const gObj2 = new Rect("b");
JSGE.DEFAULT_SCENE.addGameObject(gObj);
gObj.width = 100;
gObj.height = 100;
gObj.position.set(200, 200);

JSGE.DEFAULT_SCENE.addGameObject(gObj2);
gObj2.width = 100;
gObj2.height = 100;
gObj2.position.set(750, 10);

gObj.bindKeyPress(Input.KeyCode.W, () => {
    gObj.position.translate(new JSGE.Math.Vector2(0, -5));
});

gObj.bindMouseClick((ev) => {
    console.log(ev);            
    console.log(gObj.position);  
});

gObj.addComponent(Collision2D);
