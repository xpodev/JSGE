import { Component, Position2D } from "./JSGE.Component.js";
import Inputs from "../include/JSGE.Input.js";
declare class GameObject {
    private _name;
    constructor(_name: string);
    private _parent;
    private readonly _children;
    private readonly _event;
    private _script;
    private _scriptStart;
    private readonly _components;
    readonly position: Position2D;
    get name(): string;
    get children(): any[];
    get parent(): GameObject;
    get event(): EventTarget;
    get script(): HTMLScriptElement;
    get components(): ComponentsList;
    draw(ctx: CanvasRenderingContext2D): void;
    forAllChildren(func: (gObj: GameObject) => any): void;
    bindKeyPress(targetKey: Inputs.KeyCode, func: () => {}): void;
    bindKeyDown(key: string, func: Function): void;
    bindKeyUp(key: string, func: Function): void;
}
export declare class Rect extends GameObject {
    constructor(name: string);
    width: number;
    height: number;
    draw(ctx: CanvasRenderingContext2D): void;
}
export default GameObject;
declare type ComponentsList = {
    [key: string]: Component;
};
