import _Math from "../../../include/math";
import Utilities from "../../../include/utilities";
export default class AxisAlignedBoundingBox {
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
