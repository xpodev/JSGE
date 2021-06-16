import _Math from "../../../include/math";
import GameObject from "../../game-object";
import { ICollider } from "./types";
import Collider from "./collider";
export declare class Collider2D extends Collider {
    constructor(gameObject: GameObject);
    addCollider(collider: ICollider): void;
    private _updateColliders;
    get colliders(): ICollider[];
}
export declare class BoxCollider2D implements ICollider {
    x: number;
    y: number;
    r: number;
    w: number;
    h: number;
    constructor(x: number, y: number, r: number, w: number, h: number);
    contains(p: _Math.Point2D): boolean;
    touches(p: _Math.Point2D): boolean;
    collisionPointsWith(other: BoxCollider2D): _Math.Point2D[] | undefined;
    moveTo(p: _Math.Point2D): void;
    get angle(): number;
    set angle(degrees: number);
    private _box;
    private _rotationMatrix;
}
export declare class CircleCollider2D implements ICollider {
    private _center;
    private _radius;
    constructor(_center: _Math.Point2D, _radius: number);
    get center(): _Math.Point2D;
    get radius(): number;
    contains(p: _Math.Point2D): boolean;
    touches(p: _Math.Point2D): boolean;
    moveTo(p: _Math.Point2D): void;
    collisionPointsWith(other: ICollider): _Math.Point2D[];
}
