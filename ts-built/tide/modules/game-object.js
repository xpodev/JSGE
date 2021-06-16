import Errors from "../include/errors";
import GameEvent from "../include/game-events";
import Input from "../include/input";
import _Math from "../include/math";
import Utilities from "../include/utilities";
import { Collider2D } from "./components/collision/collider2d";
import Position2D from "./components/position2d";
import UI from "./user-interface";
class GameObject {
    constructor(_name) {
        this._name = _name;
        this._children = [];
        this.components = {};
        this.positionChanged = new GameEvent();
        this.addComponent(Position2D);
        this.position = this.getComponent(Position2D);
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
        const result = Object.values(this.components).find((c) => {
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
    getComponents(component, raiseError = true) {
        const result = Object.values(this.components).filter((c) => {
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
        return this.getComponent(component, false) != null;
    }
    bindKeyPress(targetKey, callback) {
        Input.KeyPressed.subscribe((key) => {
            if (targetKey == key) {
                callback();
            }
        });
    }
    bindKeyDown(targetKey, callback) {
        Input.KeyDown.subscribe((key) => {
            if (targetKey == key) {
                callback();
            }
        });
    }
    bindKeyUp(targetKey, callback) {
        Input.KeyUp.subscribe((key) => {
            if (targetKey == key) {
                callback();
            }
        });
    }
    bindMouseClick(callback, isMouseOver = true) {
        Input.MouseClick.subscribe((event) => {
            if (isMouseOver) {
                const collision = this.getComponent(Collider2D);
                if (collision) {
                    if (collision.colliders.some((collider) => {
                        return collider.contains(new _Math.Point2D(event.clientX, event.clientY));
                    })) {
                        callback(event);
                    }
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
        this.color = UI.Color.black;
        this.width = 100;
        this.height = 100;
    }
    draw(ctx) {
        ctx.moveTo(this.position.x, this.position.y);
        ctx.fillStyle = this.color.toHexString();
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
export class NullObject extends GameObject {
    draw() {
    }
}
export default GameObject;
