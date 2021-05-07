import { Collision, Position2D } from "./JSGE.Component.js";
import Inputs from "../include/JSGE.Input.js";
import Utilities from "../include/JSGE.Utilities.js";
import Errors from "../include/JSGE.Errors.js";
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
    getComponent(component, raiseError = true) {
        var result = Object.values(this.components).find((c) => {
            return Utilities.isOfType(c, component);
        });
        if (result) {
            return result;
        }
        if (raiseError) {
            throw new Errors.KeyError(`No component '${component.name}' found in '${this.name}'`);
        }
        return null;
    }
    hasComponent(component) {
        return this.getComponent(component, false) !== null;
    }
    bindKeyPress(targetKey, callback) {
        Inputs.KeyPressed.subscribe((key) => {
            if (targetKey == key) {
                callback();
            }
        });
    }
    bindKeyDown(targetKey, callback) {
        Inputs.KeyDown.subscribe((key) => {
            if (targetKey == key) {
                callback();
            }
        });
    }
    bindKeyUp(targetKey, callback) {
        Inputs.KeyUp.subscribe((key) => {
            if (targetKey == key) {
                callback();
            }
        });
    }
    bindMouseClick(callback, isMouseOver = true) {
        Inputs.MouseClick.subscribe((event) => {
            if (isMouseOver) {
                if (this.hasComponent(Collision)) {
                }
                else {
                    throw new Errors.InvalidOperationError("Detect MouseOver needs collision on the GameObject");
                }
            }
            else {
                callback(event);
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
