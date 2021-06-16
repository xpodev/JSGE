import Errors from "../include/errors";
import GameEvent from "../include/game-events";
import Input from "../include/input";
import _Math from "../include/math";
import Utilities from "../include/utilities";
import { Collider2D } from "./components/collision/collider2d";
import Component from "./components/component";
import Position2D from "./components/position2d";
import UI from "./user-interface";

abstract class GameObject {
    constructor(private readonly _name: string) {
        this.addComponent(Position2D);
        this.position = this.getComponent(Position2D);
    }

    private _parent: GameObject;
    private readonly _children = [];
    public readonly components: ComponentsList = {};
    public readonly position: Position2D;

    public positionChanged = new GameEvent<[Position2D]>();

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

    /* #endregion */

    abstract draw(ctx: CanvasRenderingContext2D): void;

    forAllChildren(func: (gObj: GameObject) => any) {
        for (const gObj of this.children) {
            func(gObj);
        }
    }

    addComponent(component: Utilities.Constructor<Component>) {
        this.components[component.constructor.name] = new component(this);
        Object.defineProperty(this, component.name, {
            get: () => { return this.components[component.name]; }
        });
    }

    getComponent<T extends Component>(component: Utilities.Constructor<T>, raiseError: boolean = true): T {
        const result = Object.values(this.components).find((c) => {
            return Utilities.isOfType(c, component);
        });
        if (result) {
            return result as T;
        }
        if (raiseError) {
            throw new Errors.KeyError(`No component '${component.name}' found in '${this.name}'`);
        }
        return null;
    }

    getComponents<T extends Component>(component: Utilities.Constructor<T>, raiseError: boolean = true): T[] {
        const result = Object.values(this.components).filter((c) => {
            return Utilities.isOfType(c, component);
        });
        if (result) {
            return result as T[];
        }
        if (raiseError) {
            throw new Errors.KeyError(`No component '${component.name}' found in '${this.name}'`);
        }
        return null;
    }

    hasComponent<T extends Component>(component: Utilities.Constructor<T>) {
        return this.getComponent<T>(component, false) != null;
    }

    bindKeyPress(targetKey: Input.KeyCode, callback: () => {}) {
        Input.KeyPressed.subscribe((key) => {
            if (targetKey == key) {
                callback();
            }
        });
    }

    bindKeyDown(targetKey: string, callback: Function) {
        Input.KeyDown.subscribe((key) => {
            if (targetKey == key) {
                callback();
            }
        });
    }

    bindKeyUp(targetKey: string, callback: Function) {
        Input.KeyUp.subscribe((key) => {
            if (targetKey == key) {
                callback();
            }
        });
    }

    bindMouseClick(callback: (ev: MouseEvent) => any, isMouseOver = true) {
        Input.MouseClick.subscribe((event) => {
            if (isMouseOver) {
                const collision = this.getComponent(Collider2D);
                if (collision) {
                    if (collision.colliders.some((collider) => {
                        return collider.contains(new _Math.Point2D(event.clientX, event.clientY));
                    })) {
                        callback(event);
                    }
                } else {
                    throw new Errors.InvalidOperationError("Detect MouseOver needs collision on the GameObject");
                }
            } else {
                callback(event);
            }
        });
    }
}

export class Rect extends GameObject {
    constructor(name: string) {
        super(name);
    }

    public color: UI.Color = UI.Color.black;
    public width: number = 100;
    public height: number = 100;

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.moveTo(this.position.x, this.position.y);
        ctx.fillStyle = this.color.toHexString();
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