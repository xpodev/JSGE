import { Position2D } from "./JSGE.Component.js";
import Inputs from "../include/JSGE.Input.js";
class GameObject {
    constructor(_name) {
        this._name = _name;
        this._children = [];
        this._event = new EventTarget();
        this._components = {};
        this.position = new Position2D(this);
    }
    /* #region  Getter/Setter */
    get name() {
        return this._name;
    }
    get children() {
        return this._children;
    }
    get parent() {
        return this._parent;
    }
    get event() {
        return this._event;
    }
    get script() {
        return this._script;
    }
    get components() {
        return this._components;
    }
    /* #endregion */
    draw(ctx) {
    }
    forAllChildren(func) {
        for (const gObj of this.children) {
            func(gObj);
        }
    }
    bindKeyPress(targetKey, func) {
        Inputs.KeyPressed.subscribe((key) => {
            if (targetKey == key) {
                func();
            }
        });
    }
    bindKeyDown(key, func) {
        this._event.addEventListener("keydown", function (event) {
            if (event.code === key) {
                func();
            }
        });
    }
    bindKeyUp(key, func) {
        this._event.addEventListener("keyup", function (event) {
            if (event.code === key) {
                func();
            }
        });
    }
}
export class Rect extends GameObject {
    constructor(name) {
        super(name);
        this.width = 100;
        this.height = 100;
    }
    draw(ctx) {
        ctx.moveTo(this.position.x, this.position.y);
        ctx.fillStyle = "#deadbe";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
export default GameObject;
