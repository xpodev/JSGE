import _Math from "../../../include/math";
import { Vertices } from "../../../include/types";
import Utilities from "../../../include/utilities";

export default class AxisAlignedBoundingBox {
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