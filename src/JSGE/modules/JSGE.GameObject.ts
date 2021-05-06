import { Component, ComponentClass, Position2D } from "./JSGE.Component.js";
import Inputs from "../include/JSGE.Input.js";

abstract class GameObject {
    constructor(private _name: string) {

    }

    private _parent: GameObject;
    private readonly _children = [];
    private readonly _event = new EventTarget();
    private _script: HTMLScriptElement;
    private _scriptStart: Function;
    public readonly components: ComponentsList = {};
    public readonly position = new Position2D(this);

    /* #region  Getter/Setter */
    get name() {
        return this._name;
    }

    get children() {
        return this._children;
    }

    get parent() {
        return this._parent;
    }

    get event() {
        return this._event;
    }

    get script() {
        return this._script;
    }
    /* #endregion */

    abstract draw(ctx: CanvasRenderingContext2D): void;

    forAllChildren(func: (gObj: GameObject) => any) {
        for (const gObj of this.children) {
            func(gObj);
        }
    }

    addComponent(component: ComponentClass) {
        this.components[component.constructor.name] = new component(this);
        Object.defineProperty(this, component.name, {
            get: () => { return this.components[component.name]; }
        });
    }

    bindKeyPress(targetKey: Inputs.KeyCode, func: () => {}) {
        Inputs.KeyPressed.subscribe((key) => {
            if (targetKey == key) {
                func();
            }
        })
    }

    bindKeyDown(targetKey: string, func: Function) {
        Inputs.KeyDown.subscribe((key) => {
            if (targetKey == key) {
                func();
            }
        })
    }

    bindKeyUp(targetKey: string, func: Function) {
        Inputs.KeyUp.subscribe((key) => {
            if (targetKey == key) {
                func();
            }
        })
    }

    bindMouseClick(func: Function, isMouseOver = true) {
        Inputs.MouseClick.subscribe((event) => {
            if(isMouseOver) {
                if(event) {

                }
            } else {
                func(event);          
            }
        });
    }
}

export class Rect extends GameObject {
    constructor(name: string) {
        super(name);
    }

    public width: number = 100;
    public height: number = 100;

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.moveTo(this.position.x, this.position.y);
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

export class NullObject extends GameObject {
    draw() {

    }
}

export default GameObject;

type ComponentsList = {
    [key: string]: Component
}