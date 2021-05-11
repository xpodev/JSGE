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
export interface IComponent {
    new (gameObject: GameObject): Component;
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
    contains(p: _Math.Point2D | _Math.Point3D): boolean;
    touches(p: _Math.Point2D | _Math.Point3D): boolean;
    moveTo(p: _Math.Point2D | _Math.Point3D): void;
    collisionPointsWith(other: ICollider): _Math.Point2D[] | _Math.Point3D[] | undefined;
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
    private _box;
}
export declare class Collider extends Component {
    constructor(gameObject: GameObject);
    protected readonly _colliders: ICollider[];
    collisionEnter: GameEvent<[Collision]>;
}
export declare class Collider2D extends Collider {
    constructor(gameObject: GameObject);
    addCollider(collider: ICollider): void;
    private _updateColliders;
    get colliders(): ICollider[];
}
export declare class Collision {
    other: GameObject;
    points: _Math.Point2D[] | _Math.Point3D[];
}
export {};
