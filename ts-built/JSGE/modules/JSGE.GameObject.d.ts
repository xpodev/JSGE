import { Component, Position2D } from "./JSGE.Component.js";
import Input from "../include/JSGE.Input.js";
import Utilities from "../include/JSGE.Utilities.js";
import GameEvent from "../include/JSGE.GameEvent.js";
import UI from "./JSGE.UI.js";
declare abstract class GameObject {
    private readonly _name;
    constructor(_name: string);
    private _parent;
    private readonly _children;
    readonly components: ComponentsList;
    readonly position: Position2D;
    positionChanged: GameEvent<[Position2D]>;
    get name(): string;
    get children(): any[];
    get parent(): GameObject;
    abstract draw(ctx: CanvasRenderingContext2D): void;
    forAllChildren(func: (gObj: GameObject) => any): void;
    addComponent(component: Utilities.Constructor<Component>): void;
    getComponent<T extends Component>(component: Utilities.Constructor<T>, raiseError?: boolean): T;
    getComponents<T extends Component>(component: Utilities.Constructor<T>, raiseError?: boolean): T[];
    hasComponent<T extends Component>(component: Utilities.Constructor<T>): boolean;
    bindKeyPress(targetKey: Input.KeyCode, callback: () => {}): void;
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
