import GameObject from "./JSGE.GameObject.js";
import _Math from "../include/JSGE.Math.js";
import GameEvent from "../include/JSGE.GameEvent.js";
export declare class Component {
    constructor(gameObject: GameObject);
    private _gameObject;
    private _enabled;
    readonly name: string;
    get gameObject(): GameObject;
    enable(v?: boolean): void;
    get enabled(): boolean;
}
export declare class Position2D extends Component {
    /** @param {Number} x  The object's location on the X-axis */
    private _x;
    /** @param {Number} y The object's location on the Y-axis */
    private _y;
    constructor(gameObject: GameObject);
    /**
     * Moves the object in the X-axis and Y-axis relative to itself
     * @param {Number} x
     * @param {Number} y
     */
    translate(x: _Math.Vector2): _Math.Vector2;
    translate(x: number, y: number): _Math.Vector2;
    set(x: number, y: number, dispatchEvent: boolean): void;
    set(position: _Math.Vector2, dispatchEvent: boolean): void;
    get x(): number;
    set x(x: number);
    get y(): number;
    set y(y: number);
    get coords(): _Math.Point2D;
    get enabled(): any;
    set enabled(v: any);
}
interface ICollider {
    contains(p: Point): boolean;
    touches(p: Point): boolean;
    moveTo(p: Point): void;
    collisionPointsWith(other: ICollider): Point[] | undefined;
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
export declare class Collider extends Component {
    protected readonly _colliders: ICollider[];
    collisionOverlap: GameEvent<[Collision]>;
    collisionBegin: GameEvent<[Collision]>;
    collisionEnd: GameEvent<[Collision]>;
    private _isColliding;
    get isColliding(): boolean;
    set isColliding(v: boolean);
}
export declare class Collider2D extends Collider {
    constructor(gameObject: GameObject);
    addCollider(collider: ICollider): void;
    private _updateColliders;
    get colliders(): ICollider[];
}
declare type Point = _Math.Point2D | _Math.Point3D;
export declare class Collision {
    other: GameObject;
    points: Point[];
    collider: ICollider;
}
export {};
