import { Position2D } from "./JSGE.Component.js";
import Inputs from "../include/JSGE.Input.js";
class GameObject {
    constructor(_name) {
        this._name = _name;
        this._children = [];
        this._event = new EventTarget();
        this.components = {};
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
    forAllChildren(func) {
        for (const gObj of this.children) {
            func(gObj);
        }
    }
    addComponent(component) {
        this.components[component.constructor.name] = new component(this);
        Object.defineProperty(this, component.name, {
            get: () => { return this.components[component.name]; }
        });
    }
    bindKeyPress(targetKey, func) {
        Inputs.KeyPressed.subscribe((key) => {
            if (targetKey == key) {
                func();
            }
        });
    }
    bindKeyDown(targetKey, func) {
        Inputs.KeyDown.subscribe((key) => {
            if (targetKey == key) {
                func();
            }
        });
    }
    bindKeyUp(targetKey, func) {
        Inputs.KeyUp.subscribe((key) => {
            if (targetKey == key) {
                func();
            }
        });
    }
    bindMouseClick(func, isMouseOver = true) {
        Inputs.MouseClick.subscribe((event) => {
            if (isMouseOver) {
                if (event) {
                }
            }
            else {
                func(event);
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
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
export class NullObject extends GameObject {
    draw() {
    }
}
export default GameObject;
