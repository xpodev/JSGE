import { Component, Position2D } from "./JSGE.Component.js";
import Inputs from "../include/JSGE.Input.js";

class GameObject {
    constructor(private _name: string) {

    }

    private _parent: GameObject;
    private readonly _children = [];
    private readonly _event = new EventTarget();
    private _script: HTMLScriptElement;
    private _scriptStart: Function;
    private readonly _components: ComponentsList = {};
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

    get components() {
        return this._components;
    }
    /* #endregion */

    public draw(ctx: CanvasRenderingContext2D) {
        
    }

    forAllChildren(func: (gObj: GameObject) => any) {
        for (const gObj of this.children) {
            func(gObj);
        }
    }

    bindKeyPress(targetKey: Inputs.KeyCode, func: () => {}) {
        Inputs.KeyPressed.subscribe((key) => {
            if (targetKey == key) {
                func();
            }
        })
    }

    bindKeyDown(key: string, func: Function) {
        this._event.addEventListener("keydown", function (event: KeyboardEvent) {
            if (event.code === key) {
                func();
            }
        });
    }

    bindKeyUp(key: string, func: Function) {
        this._event.addEventListener("keyup", function (event: KeyboardEvent) {
            if (event.code === key) {
                func();
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
        ctx.fillStyle = "#deadbe";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

export default GameObject;

type ComponentsList = {
    [key: string]: Component
}