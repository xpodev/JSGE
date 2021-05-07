import { Component, IComponent, Position2D } from "./JSGE.Component.js";
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
    addComponent(component: IComponent): void;
    getComponent(component: IComponent, raiseError?: boolean): Component;
    hasComponent(component: IComponent): boolean;
    bindKeyPress(targetKey: Inputs.KeyCode, callback: () => {}): void;
    bindKeyDown(targetKey: string, callback: Function): void;
    bindKeyUp(targetKey: string, callback: Function): void;
    bindMouseClick(callback: (ev: MouseEvent) => any, isMouseOver?: boolean): void;
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
