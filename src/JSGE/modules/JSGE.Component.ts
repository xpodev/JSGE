import GameObject from "./JSGE.GameObject.js";
import _Math from "../include/JSGE.Math.js";
import Utilities from "../include/JSGE.Utilities.js";
// import Errors from "../include/JSGE.Errors";
import Events from "../include/JSGE.Events.js";
import Errors from "../include/JSGE.Errors.js";
import GameEvent from "../include/JSGE.GameEvent.js";

export class Component {
    constructor(gameObject: GameObject) {
        this._gameObject = gameObject;
    }

    private _gameObject: GameObject;
    private _enabled = true;

    public readonly name = this.constructor.name;

    get gameObject() {
        return this._gameObject;
    }

    enable(v: boolean = true) {
        this._enabled = v;
    }

    get enabled() {
        return this._enabled;
    }
}

export class Position2D extends Component {
    /** @param {Number} x  The object's location on the X-axis */
    private _x: number = 0;
    /** @param {Number} y The object's location on the Y-axis */
    private _y: number = 0;
    constructor(gameObject: GameObject) {
        super(gameObject);
        delete this.enable;
        Object.seal(this);
    }

    /**
     * Moves the object in the X-axis and Y-axis relative to itself
     * @param {Number} x
     * @param {Number} y
     */
    translate(x: _Math.Vector2): _Math.Vector2;
    translate(x: number, y: number): _Math.Vector2;
    translate(x: number | _Math.Vector2, y?: number): _Math.Vector2 {
        if (typeof x == "number" && typeof y == "number") {
            this.x += x;
            this.y += y;
        } else if (Utilities.isOfType(x, _Math.Vector2)) {
            x = x as _Math.Vector2;
            this.x += x.X;
            this.y += x.Y;
        } else {
            throw new TypeError(`Can not translate '${this.gameObject.name}' with the given arguments '${x}','${y}'`);
        }
        this.gameObject.positionChanged.invoke(this);
        return this.coords.toVector();
    }

    set(x: number, y: number, dispatchEvent: boolean): void;
    set(position: _Math.Vector2, dispatchEvent: boolean): void;
    set(x: number | _Math.Vector2, y: number | boolean, dispatchEvent = false) {
        if (typeof x == "number" && typeof y == "number") {
            this.x = x;
            this.y = y;
            if (dispatchEvent) {
                this.gameObject.positionChanged.invoke(this);
            }
        } else if (Utilities.isOfType(x, _Math.Vector2)) {
            x = x as _Math.Vector2;
            y = y as boolean;
            this.x = x.X;
            this.y = x.Y;
            if (y) {
                this.gameObject.positionChanged.invoke(this);
            }
        } else {
            throw new TypeError(`Can not set position of '${this.gameObject.name}' with the given arguments '${x}','${y}'`);
        }
    }

    get x() {
        return this._x;
    }

    set x(x: number) {
        if (Utilities.isOfType(x, Number)) {
            this._x = x;
            this.gameObject.positionChanged.invoke(this);
        }
    }

    get y() {
        return this._y;
    }

    set y(y: number) {
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

    set enabled(v: any) {
        throw new Errors.InvalidOperationError(`Can not set enable for ${this.name} component`);
    }
}

class AxisAlignedBoundingBox {
    constructor(l: number, t: number, r: number, b: number);
    constructor(root: _Math.Point2D, w: number, h: number);
    constructor(center: _Math.Point2D, extent: _Math.Vector2);
    constructor(a: number | _Math.Point2D, b: number | _Math.Vector2, c?: number, d?: number) {
        if (typeof a == "number") {
            // L T R B implementation
            this._L = a as number;
            this._T = b as number;
            this._R = c as number;
            this._B = d as number;
        } else if (Utilities.isOfType(a, _Math.Point2D) && typeof b == "number") {
            // root w h implementation
            this._L = a.X;
            this._T = a.Y;
            this._R = a.X + b;
            this._B = a.Y + c;
        } else {
            // center extent implementation
            a = a as _Math.Point2D;
        }
    }

    private _L: number;
    private _T: number;
    private _R: number;
    private _B: number;

    get W(): number {
        return this.R - this.L;
    }

    get H(): number {
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

    verticesAsObject(): Vertices {
        return {
            lt: new _Math.Point2D(this.L, this.T),
            rt: new _Math.Point2D(this.R, this.T),
            lb: new _Math.Point2D(this.L, this.B),
            rb: new _Math.Point2D(this.R, this.B)
        };
    }

    translate(v: _Math.Vector2) {
        this._L += v.X;
        this._T += v.Y;
        this._R += v.X;
        this._B += v.Y;
    }

    moveTo(p: _Math.Point2D) {
        this._R = p.X + this.W;
        this._B = p.Y + this.H;
        this._L = p.X;
        this._T = p.Y;
    }

    contains(p: _Math.Point2D) {
        return !(p.X < this.L || p.X > this.R || p.Y < this.T || p.Y > this.B);
    }

    touches(p: _Math.Point2D) {
        return ((p.X == this.L || p.X == this.R) && (p.Y >= this.T && p.Y <= this.B) ||
            (p.Y == this.T || p.Y == this.B) && (p.X >= this.L && p.X <= this.R));
    }
}

interface ICollider {
    contains(p: Point): boolean;
    touches(p: Point): boolean;
    moveTo(p: Point): void;
    collisionPointsWith(other: ICollider): Point[] | undefined;
}

export class BoxCollider2D implements ICollider {
    constructor(
        public x: number,
        public y: number,
        public r: number,
        public w: number,
        public h: number
    ) {
        this._box = new AxisAlignedBoundingBox(new _Math.Point2D(x, y), w, h);
        this._rotationMatrix = new _Math.RotationMatrix2D();
        this.angle = r;
    }

    contains(p: _Math.Point2D): boolean {
        return this._box.contains(this._rotationMatrix.transform(p));
    }

    touches(p: _Math.Point2D): boolean {
        return this._box.touches(this._rotationMatrix.transform(p));
    }

    collisionPointsWith(other: BoxCollider2D): _Math.Point2D[] | undefined {
        return this._box.vertices.filter((point) => {
            return other.contains(point);
        });
    }

    moveTo(p: _Math.Point2D) {
        this._box.moveTo(p);
    }

    get angle(): number {
        return this.r;
    }

    set angle(degrees: number) {
        this.r = degrees;
        this._rotationMatrix.setAngle(degrees);
    }

    private _box: AxisAlignedBoundingBox;
    private _rotationMatrix: _Math.RotationMatrix2D;
}

export class CircleCollider2D implements ICollider {
    constructor(private _center: _Math.Point2D, private _radius: number) {

    }

    get center() {
        return this._center;
    }

    get radius() {
        return this._radius;
    }

    contains(p: _Math.Point2D): boolean {
        return p.toVector().minus(this.center.toVector()).squareLength < (this._radius * this._radius);
    }

    touches(p: _Math.Point2D): boolean {
        return p.toVector().minus(this.center.toVector()).squareLength == (this._radius * this._radius);
    }

    moveTo(p: _Math.Point2D): void {
        this._center = p;
    }

    collisionPointsWith(other: ICollider): _Math.Point2D[] {
        throw new Error("Method not implemented.");
    }

}

export class Collider extends Component {
    protected readonly _colliders: ICollider[] = [];

    public collisionOverlap = new GameEvent<[Collision]>();
    public collisionBegin = new GameEvent<[Collision]>();
    public collisionEnd = new GameEvent<[Collision]>();
    private _isColliding: boolean = false;

    get isColliding(): boolean {
        return this._isColliding
    }

    set isColliding(v: boolean) {
        this._isColliding = v;
    }
}

export class Collider2D extends Collider {
    constructor(gameObject: GameObject) {
        super(gameObject);
        Object.seal(this);

        this.gameObject.positionChanged.subscribe((position) => {
            this._updateColliders(position);
        });
    }


    addCollider(collider: ICollider) {
        this._colliders.push(collider);
    }

    private _updateColliders(position: Position2D) {
        this._colliders.forEach(collider => {
            collider.moveTo(position.coords);
        })
    }

    get colliders() {
        return this._colliders;
    }
}

type Vertices = {
    lt: Point,
    rt: Point,
    lb: Point,
    rb: Point
}

type Point = _Math.Point2D | _Math.Point3D;

export class Collision {
    other: GameObject;
    points: Point[];
    collider: ICollider;
}

/**
 * Rotates the object relative to it's current angle
 * @param {Number} angle 
 */
function rotate(angle) {
    this.angle += angle;
}