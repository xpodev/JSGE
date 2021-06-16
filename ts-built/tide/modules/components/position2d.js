import Errors from "../../include/errors";
import _Math from "../../include/math";
import Utilities from "../../include/utilities";
import Component from "./component";
class Position2D extends Component {
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
export default Position2D;
