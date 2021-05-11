import * as JSGE from "./GameEngine.js";
import { Rect } from "./JSGE/modules/JSGE.GameObject.js";
import Input from "./JSGE/include/JSGE.Inputs.js";
import { Collider2D, BoxCollider2D, Collision } from "./JSGE/modules/JSGE.Component.js";
import UI from "./JSGE/modules/JSGE.UI.js";

const gObj = new Rect("a");
const gObj2 = new Rect("b");

const point1 = new Rect("p");
point1.width = 10;
point1.height = 10;
point1.color = UI.Color.red;

JSGE.DEFAULT_SCENE.addGameObject(gObj);
gObj.position.set(200, 200);

JSGE.DEFAULT_SCENE.addGameObject(gObj2);
gObj2.position.set(350, 350);

gObj.bindKeyPress(Input.KeyCode.W, () => {
    gObj.position.translate(new JSGE.Math.Vector2(0, -10));
});

gObj.bindKeyPress(Input.KeyCode.A, () => {
    gObj.position.translate(new JSGE.Math.Vector2(-10, 0));
});

gObj.bindKeyPress(Input.KeyCode.S, () => {
    gObj.position.translate(new JSGE.Math.Vector2(0, 10));
});

gObj.bindKeyPress(Input.KeyCode.D, () => {
    gObj.position.translate(new JSGE.Math.Vector2(10, 0));
});


gObj.addComponent(Collider2D);
gObj2.addComponent(Collider2D);
const col = gObj.getComponent(Collider2D);
const col2 = gObj2.getComponent(Collider2D);
col.addCollider(new BoxCollider2D(gObj.position.x, gObj.position.y, 0, gObj.width, gObj.height));
col2.addCollider(new BoxCollider2D(gObj2.position.x, gObj2.position.y, 0, gObj2.width, gObj2.height));

gObj.bindMouseClick((ev) => {
    JSGE.DEFAULT_SCENE.addGameObject(point1);
});

gObj2.bindMouseClick((ev) => {
    console.log("Mouse2");
});



col.collisionEnter.subscribe((collision) => {
    point1.position.set(collision.points[0].toVector());
    // const X = JSGE.Math.closer(gObj2.position.x, (gObj2.position.x + gObj2.width), collision.points.x);
    // gObj2.position.translate(new JSGE.Math.Vector2(X, 0));
});