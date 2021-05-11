import _Math from "../include/JSGE.Math.js";
import Utilities from "../include/JSGE.Utilities.js";
import Errors from "../include/JSGE.Errors.js";
import GameEvent from "../include/JSGE.GameEvent.js";
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
        this.gameObject.positionChanged.invoke(this);
        return this.coords.toVector();
    }
    set(x, y, dispatchEvent = false) {
        if (typeof x == "number" && typeof y == "number") {
            this.x = x;
            this.y = y;
            if (dispatchEvent) {
                this.gameObject.positionChanged.invoke(this);
            }
        }
        else if (Utilities.isOfType(x, _Math.Vector2)) {
            x = x;
            y = y;
            this.x = x.X;
            this.y = x.Y;
            if (y) {
                this.gameObject.positionChanged.invoke(this);
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
            this.gameObject.positionChanged.invoke(this);
        }
    }
    get y() {
        return this._y;
    }
    set y(y) {
        if (Utilities.isOfType(y, Number)) {
            this._y = y;
            this.gameObject.positionChanged.invoke(this);
        }
    }
    get coords() {
        return new _Math.Point2D(this.x, this.y);
    }
    get enabled() {
        return true;
    }
    set enabled(v) {
        throw new Errors.InvalidOperationError(`Can not set enable for ${this.name} component`);
    }
}
class AxisAlignedBoundingBox {
    constructor(a, b, c, d) {
        if (typeof a == "number") {
            // L T R B implementation
            this._L = a;
            this._T = b;
            this._R = c;
            this._B = d;
        }
        else if (Utilities.isOfType(a, _Math.Point2D) && typeof b == "number") {
            // root w h implementation
            this._L = a.X;
            this._T = a.Y;
            this._R = a.X + b;
            this._B = a.Y + c;
        }
        else {
            // center extent implementation
            a = a;
        }
    }
    get W() {
        return this.R - this.L;
    }
    get H() {
        return this.B - this.T;
    }
    get L() {
        return this._L;
    }
    get T() {
        return this._T;
    }
    get R() {
        return this._R;
    }
    get B() {
        return this._B;
    }
    get vertices() {
        return [
            new _Math.Point2D(this.L, this.T),
            new _Math.Point2D(this.R, this.T),
            new _Math.Point2D(this.L, this.B),
            new _Math.Point2D(this.R, this.B)
        ];
    }
    verticesAsObject() {
        return {
            lt: new _Math.Point2D(this.L, this.T),
            rt: new _Math.Point2D(this.R, this.T),
            lb: new _Math.Point2D(this.L, this.B),
            rb: new _Math.Point2D(this.R, this.B)
        };
    }
    translate(v) {
        this._L += v.X;
        this._T += v.Y;
        this._R += v.X;
        this._B += v.Y;
    }
    moveTo(p) {
        this._R = p.X + this.W;
        this._B = p.Y + this.H;
        this._L = p.X;
        this._T = p.Y;
    }
    contains(p) {
        return !(p.X < this.L || p.X > this.R || p.Y < this.T || p.Y > this.B);
    }
    touches(p) {
        return ((p.X == this.L || p.X == this.R) && (p.Y >= this.T && p.Y <= this.B) ||
            (p.Y == this.T || p.Y == this.B) && (p.X >= this.L && p.X <= this.R));
    }
}
export class BoxCollider2D {
    constructor(x, y, r, w, h) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.w = w;
        this.h = h;
        this._box = new AxisAlignedBoundingBox(new _Math.Point2D(x, y), w, h);
    }
    contains(p) {
        return this._box.contains(p);
    }
    touches(p) {
        return this._box.touches(p);
    }
    collisionPointsWith(other) {
        return this._box.vertices.filter((point) => {
            return other.contains(point);
        });
    }
    moveTo(p) {
        this._box.moveTo(p);
    }
}
export class Collider extends Component {
    constructor(gameObject) {
        super(gameObject);
        this._colliders = [];
        this.collisionEnter = new GameEvent();
    }
}
export class Collider2D extends Collider {
    constructor(gameObject) {
        super(gameObject);
        Object.seal(this);
        this.gameObject.positionChanged.subscribe((position) => {
            this._updateColliders(position);
        });
    }
    addCollider(collider) {
        this._colliders.push(collider);
    }
    _updateColliders(position) {
        this._colliders.forEach(collider => {
            collider.moveTo(position.coords);
        });
    }
    get colliders() {
        return this._colliders;
    }
}
export class Collision {
}
/**
 * Rotates the object relative to it's current angle
 * @param {Number} angle
 */
function rotate(angle) {
    this.angle += angle;
}
