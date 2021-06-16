import Errors from "../../include/errors";
import _Math from "../../include/math";
import Utilities from "../../include/utilities";
import GameObject from "../game-object";
import Component from "./component";

class Position2D extends Component {
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

export default Position2D;