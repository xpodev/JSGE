import { Component, ComponentClass, Position2D } from "./JSGE.Component.js";
import Inputs from "../include/JSGE.Input.js";
declare abstract class GameObject {
    private _name;
    constructor(_name: string);
    private _parent;
    private readonly _children;
    private readonly _event;
    private _script;
    private _scriptStart;
    readonly components: ComponentsList;
    readonly position: Position2D;
    get name(): string;
    get children(): any[];
    get parent(): GameObject;
    get event(): EventTarget;
    get script(): HTMLScriptElement;
    abstract draw(ctx: CanvasRenderingContext2D): void;
    forAllChildren(func: (gObj: GameObject) => any): void;
    addComponent(component: ComponentClass): void;
    bindKeyPress(targetKey: Inputs.KeyCode, func: () => {}): void;
    bindKeyDown(targetKey: string, func: Function): void;
    bindKeyUp(targetKey: string, func: Function): void;
    bindMouseClick(func: Function, isMouseOver?: boolean): void;
}
export declare class Rect extends GameObject {
    constructor(name: string);
    width: number;
    height: number;
    draw(ctx: CanvasRenderingContext2D): void;
}
export declare class NullObject extends GameObject {
    draw(): void;
}
export default GameObject;
declare type ComponentsList = {
    [key: string]: Component;
};
