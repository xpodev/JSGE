import GameObject from "./JSGE.GameObject.js";
import _Math from "../include/JSGE.Math.js";
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
    get coords(): _Math.Vector2;
    get enabled(): any;
    set enabled(v: any);
}
export declare class BoxCollider2D {
    x: number;
    y: number;
    r: number;
    w: number;
    h: number;
    constructor(x: number, y: number, r: number, w: number, h: number);
    private _L;
    checkPoint(x: number, y: number): void;
}
export declare class Collision extends Component {
    constructor(gameObject: GameObject);
}
export declare class Collision2D extends Collision {
    constructor(gameObject: GameObject);
    private readonly _collisionBoxes;
    addCollisionBox(box: BoxCollider2D): void;
    get collisionBoxes(): BoxCollider2D[];
}
