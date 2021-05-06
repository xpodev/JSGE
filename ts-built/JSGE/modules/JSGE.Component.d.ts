import GameObject from "./JSGE.GameObject.js";
import _Math from "../include/JSGE.Math.js";
export declare class Component {
    constructor(gameObject: GameObject);
    private _gameObject;
    private _enabled;
    readonly name: string;
    get gameObject(): GameObject;
    set enabled(v: boolean);
    get enabled(): boolean;
}
export interface ComponentClass {
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
    set enabled(v: any);
}
export declare class Collision2D extends Component {
    constructor(gameObject: GameObject);
    private readonly _collisionBoxes;
}
