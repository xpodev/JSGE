import _Math from "../../../include/math";
import GameObject from "../../game-object";
import Position2D from "../position2d";
import AxisAlignedBoundingBox from "./axis-aligned-bounding-box";
import { ICollider } from "./types";
import Collider from "./collider";

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