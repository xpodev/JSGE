import _Math from "../include/JSGE.Math.js";
import Utilities from "../include/JSGE.Utilities.js";
// import Errors from "../include/JSGE.Errors";
import Events from "../include/JSGE.Events.js";
import Errors from "../include/JSGE.Errors.js";
export class Component {
    constructor(gameObject) {
        this._enabled = true;
        this.name = this.constructor.name;
        this._gameObject = gameObject;
    }
    get gameObject() {
        return this._gameObject;
    }
    enable(v = true) {
        this._enabled = v;
    }
    get enabled() {
        return this._enabled;
    }
}
export class Position2D extends Component {
    constructor(gameObject) {
        super(gameObject);
        /** @param {Number} x  The object's location on the X-axis */
        this._x = 0;
        /** @param {Number} y The object's location on the Y-axis */
        this._y = 0;
        delete this.enable;
        Object.seal(this);
    }
    translate(x, y) {
        if (typeof x == "number" && typeof y == "number") {
            this.x += x;
            this.y += y;
        }
        else if (Utilities.isOfType(x, _Math.Vector2)) {
            x = x;
            this.x += x.X;
            this.y += x.Y;
        }
        else {
            throw new TypeError(`Can not translate '${this.gameObject.name}' with the given arguments '${x}','${y}'`);
        }
        this.gameObject.event.dispatchEvent(Events.POSITION_CHANGED);
        return this.coords;
    }
    set(x, y, dispatchEvent = false) {
        if (typeof x == "number" && typeof y == "number") {
            this.x = x;
            this.y = y;
            if (dispatchEvent) {
                this.gameObject.event.dispatchEvent(Events.POSITION_CHANGED);
            }
        }
        else if (Utilities.isOfType(x, _Math.Vector2)) {
            x = x;
            y = y;
            this.x = x.X;
            this.y = x.Y;
            if (y) {
                this.gameObject.event.dispatchEvent(Events.POSITION_CHANGED);
            }
        }
        else {
            throw new TypeError(`Can not set position of '${this.gameObject.name}' with the given arguments '${x}','${y}'`);
        }
    }
    get x() {
        return this._x;
    }
    set x(x) {
        if (Utilities.isOfType(x, Number)) {
            this._x = x;
            this.gameObject.event.dispatchEvent(Events.POSITION_CHANGED);
        }
    }
    get y() {
        return this._y;
    }
    set y(y) {
        if (Utilities.isOfType(y, Number)) {
            this._y = y;
            this.gameObject.event.dispatchEvent(Events.POSITION_CHANGED);
        }
    }
    get coords() {
        return new _Math.Vector2(this.x, this.y);
    }
    get enabled() {
        return true;
    }
    set enabled(v) {
        throw new Errors.InvalidOperationError(`Can not set enable for ${this.name} component`);
    }
}
class AxisAlignedBoundingBox {
    constructor() {
    }
}
export class BoxCollider2D {
    constructor(x, y, r, w, h) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.w = w;
        this.h = h;
    }
    checkPoint(x, y) {
        if ()
            ;
    }
}
export class Collision extends Component {
    constructor(gameObject) {
        super(gameObject);
    }
}
export class Collision2D extends Collision {
    constructor(gameObject) {
        super(gameObject);
        this._collisionBoxes = [];
        Object.seal(this);
    }
    addCollisionBox(box) {
        this._collisionBoxes.push(box);
    }
    get collisionBoxes() {
        return this._collisionBoxes;
    }
}
/**
 * Rotates the object relative to it's current angle
 * @param {Number} angle
 */
function rotate(angle) {
    this.angle += angle;
}
