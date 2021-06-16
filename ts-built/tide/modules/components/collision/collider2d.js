import _Math from "../../../include/math";
import AxisAlignedBoundingBox from "./axis-aligned-bounding-box";
import Collider from "./collider";
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
export class BoxCollider2D {
    constructor(x, y, r, w, h) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.w = w;
        this.h = h;
        this._box = new AxisAlignedBoundingBox(new _Math.Point2D(x, y), w, h);
        this._rotationMatrix = new _Math.RotationMatrix2D();
        this.angle = r;
    }
    contains(p) {
        return this._box.contains(this._rotationMatrix.transform(p));
    }
    touches(p) {
        return this._box.touches(this._rotationMatrix.transform(p));
    }
    collisionPointsWith(other) {
        return this._box.vertices.filter((point) => {
            return other.contains(point);
        });
    }
    moveTo(p) {
        this._box.moveTo(p);
    }
    get angle() {
        return this.r;
    }
    set angle(degrees) {
        this.r = degrees;
        this._rotationMatrix.setAngle(degrees);
    }
}
export class CircleCollider2D {
    constructor(_center, _radius) {
        this._center = _center;
        this._radius = _radius;
    }
    get center() {
        return this._center;
    }
    get radius() {
        return this._radius;
    }
    contains(p) {
        return p.toVector().minus(this.center.toVector()).squareLength < (this._radius * this._radius);
    }
    touches(p) {
        return p.toVector().minus(this.center.toVector()).squareLength == (this._radius * this._radius);
    }
    moveTo(p) {
        this._center = p;
    }
    collisionPointsWith(other) {
        throw new Error("Method not implemented.");
    }
}
