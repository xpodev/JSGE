import GameObject from "./JSGE.GameObject.js";
import _Math from "../include/JSGE.Math.js";
import Utilities from "../include/JSGE.Utilities.js";
// import Errors from "../include/JSGE.Errors";
import Events from "../include/JSGE.Events.js";

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

    set enabled(v: boolean) {
        this._enabled = v;
    }

    get enabled() {
        return this._enabled;
    }
}

export interface ComponentClass {
    new (gameObject: GameObject): Component;
}

export class Position2D extends Component {
    /** @param {Number} x  The object's location on the X-axis */
    private _x: number = 0;
    /** @param {Number} y The object's location on the Y-axis */
    private _y: number = 0;
    constructor(gameObject: GameObject) {
        super(gameObject);
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
        this.gameObject.event.dispatchEvent(Events.POSITION_CHANGED);
        return this.coords;
    }

    set(x: number, y: number, dispatchEvent: boolean): void;
    set(position: _Math.Vector2, dispatchEvent: boolean): void;
    set(x: number | _Math.Vector2, y: number | boolean, dispatchEvent = false) {
        if (typeof x == "number" && typeof y == "number") {
            this.x = x;
            this.y = y;
            if (dispatchEvent) {
                this.gameObject.event.dispatchEvent(Events.POSITION_CHANGED);
            }
        } else if (Utilities.isOfType(x, _Math.Vector2)) {
            x = x as _Math.Vector2;
            y = y as boolean;
            this.x = x.X;
            this.y = x.Y;
            if (y) {
                this.gameObject.event.dispatchEvent(Events.POSITION_CHANGED);
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
            this.gameObject.event.dispatchEvent(Events.POSITION_CHANGED);
        }
    }

    get y() {
        return this._y;
    }

    set y(y: number) {
        if (Utilities.isOfType(y, Number)) {
            this._y = y;
            this.gameObject.event.dispatchEvent(Events.POSITION_CHANGED);
        }
    }

    get coords() {
        return new _Math.Vector2(this.x, this.y);
    }

    set enabled(v: any) {
        
    }
}

class CollisionBox2D {
    constructor(
        public x: number,
        public y: number,
        public r: number,
        public w: number,
        public h: number) {

    }
}

export class Collision2D extends Component {
    constructor(gameObject: GameObject) {
        super(gameObject);
        Object.seal(this);
    }

    private readonly _collisionBoxes: CollisionBox2D[] = [];

    
}

/**
 * Rotates the object relative to it's current angle
 * @param {Number} angle 
 */
function rotate(angle) {
    this.angle += angle;
}