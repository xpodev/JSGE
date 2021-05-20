import * as JSGE from "./GameEngine.js";
import { Rect } from "./JSGE/modules/JSGE.GameObject.js";
import Input from "./JSGE/include/JSGE.Input.js";
import { Collider2D, BoxCollider2D } from "./JSGE/modules/JSGE.Component.js";
import UI from "./JSGE/modules/JSGE.UI.js";

const gObj = new Rect("a");

const gObj2 = new Rect("b");
gObj2.width = 350;
gObj2.height = 350;
gObj2.color = UI.Color.magenta;

const point1 = new Rect("p1");
point1.width = 2;
point1.height = 2;
point1.color = UI.Color.green;

const point2 = new Rect("p2");
point2.width = 2;
point2.height = 2;
point2.color = UI.Color.red;

const overlapRect = new Rect("overlap");
overlapRect.width = 0;
overlapRect.height = 0;
overlapRect.color = UI.Color.cyan;

JSGE.DEFAULT_SCENE.addGameObject(gObj2);
gObj2.position.set(350, 350);

JSGE.DEFAULT_SCENE.addGameObject(gObj);
gObj.position.set(200, 200);

gObj.bindKeyPress(Input.KeyCode.KeyW, () => {
    gObj.position.translate(new JSGE.Math.Vector2(0, -10));
});

gObj.bindKeyPress(Input.KeyCode.KeyA, () => {
    gObj.position.translate(new JSGE.Math.Vector2(-10, 0));
});

gObj.bindKeyPress(Input.KeyCode.KeyS, () => {
    gObj.position.translate(new JSGE.Math.Vector2(0, 10));
});

gObj.bindKeyPress(Input.KeyCode.KeyD, () => {
    gObj.position.translate(new JSGE.Math.Vector2(10, 0));
});


gObj.addComponent(Collider2D);
gObj2.addComponent(Collider2D);
const col = gObj.getComponent(Collider2D);
const col2 = gObj2.getComponent(Collider2D);
col.addCollider(new BoxCollider2D(gObj.position.x, gObj.position.y, 0, gObj.width, gObj.height));
col2.addCollider(new BoxCollider2D(gObj2.position.x, gObj2.position.y, 0, gObj2.width, gObj2.height));

gObj.bindMouseClick((ev) => {
    console.clear();
});

gObj2.bindMouseClick((ev) => {
    console.log("Mouse2");
});

col.collisionBegin.subscribe((collision) => {
    JSGE.DEFAULT_SCENE.addGameObject(overlapRect);
    JSGE.DEFAULT_SCENE.addGameObject(point1);
    point1.position.set(collision.points[0].X, collision.points[0].Y);
});

col2.collisionBegin.subscribe((collision) => {
    JSGE.DEFAULT_SCENE.addGameObject(point2);
    point2.position.set(collision.points[0].X, collision.points[0].Y);
});

col.collisionOverlap.subscribe((collision) => {
    point1.position.set(collision.points[0].X, collision.points[0].Y);
});

col2.collisionOverlap.subscribe((collision) => {
    point2.position.set(collision.points[0].X, collision.points[0].Y);
    overlapRect.width = JSGE.Math.abs(point1.position.x - point2.position.x);
    overlapRect.height = JSGE.Math.abs(point1.position.y - point2.position.y);
    overlapRect.position.set(JSGE.Math.min(point2.position.x, point1.position.x), JSGE.Math.min(point2.position.y, point1.position.y));
});

col.collisionEnd.subscribe((collision) => {
    // JSGE.DEFAULT_SCENE.removeGameObject(overlapRect);
    // JSGE.DEFAULT_SCENE.removeGameObject(point1);
});

col2.collisionEnd.subscribe((collision) => {
    // JSGE.DEFAULT_SCENE.removeGameObject(point2);
});