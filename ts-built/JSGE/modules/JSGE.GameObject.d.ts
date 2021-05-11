import { Component, IComponent, Position2D } from "./JSGE.Component.js";
import Inputs from "../include/JSGE.Input.js";
import GameEvent from "../include/JSGE.GameEvent.js";
import UI from "./JSGE.UI.js";
declare abstract class GameObject {
    private _name;
    constructor(_name: string);
    private _parent;
    private readonly _children;
    private readonly _event;
    readonly components: ComponentsList;
    readonly position: Position2D;
    positionChanged: GameEvent<[Position2D]>;
    get name(): string;
    get children(): any[];
    get parent(): GameObject;
    get event(): EventTarget;
    abstract draw(ctx: CanvasRenderingContext2D): void;
    forAllChildren(func: (gObj: GameObject) => any): void;
    addComponent(component: IComponent): void;
    getComponent<T extends Component>(component: IComponent, raiseError?: boolean): T;
    hasComponent<T extends Component>(component?: IComponent): boolean;
    bindKeyPress(targetKey: Inputs.KeyCode, callback: () => {}): void;
    bindKeyDown(targetKey: string, callback: Function): void;
    bindKeyUp(targetKey: string, callback: Function): void;
    bindMouseClick(callback: (ev: MouseEvent) => any, isMouseOver?: boolean): void;
}
export declare class Rect extends GameObject {
    constructor(name: string);
    color: UI.Color;
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
