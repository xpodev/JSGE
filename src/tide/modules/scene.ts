import Input from "../include/input";
import Config from "../include/tide.config";
import { Collider2D } from "./components/collision/collider2d";
import GameObject from "./game-object";

export enum SceneType {
    /**
     * Don't use that
     */
    Scene0D,
    /**
     * Don't use that
     */
    Scene1D,
    /**
     * You can use that
     */
    Scene2D,
    /**
     * You can use that
     */
    Scene3D,
    /**
     * Don't use that
     */
    Scene4D
};

abstract class Scene {
    constructor(private sceneName: string, private sceneType: SceneType) {
        this._canvas = document.createElement("canvas");
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;
    }

    private _updateInterval: number;
    protected readonly _canvas: HTMLCanvasElement;
    protected readonly abstract _context: Context;
    public readonly gameObjects: GameObject[] = [];
    private _updateLoopDone = true;

    public get name(): string {
        return this.sceneName;
    }

    public get type(): SceneType {
        return this.sceneType;
    }

    activate() {
        document.addEventListener("keypress", (event) => {
            Input.KeyPressed.invoke(Input.KeyCode[event.code]);
        });

        document.addEventListener("keydown", (event) => {
            Input.KeyDown.invoke(Input.KeyCode[event.code]);
        });

        document.addEventListener("keyup", (event) => {
            Input.KeyUp.invoke(Input.KeyCode[event.code]);
        });

        this._canvas.addEventListener("mousedown", (event) => {
            Input.MouseClick.invoke(event);
        });

        document.body.append(this._canvas);
        this._updateInterval = setInterval(() => {
            if (this._updateLoopDone) {
                this._updateLoopDone = false;
                this.update();
                this._updateLoopDone = true;
            }
        }, 1000 / Config.MAX_FPS);
    }

    forAllObjects(func: (gObj: GameObject) => any) {
        for (const gObj of this.gameObjects) {
            func(gObj);
            gObj.forAllChildren(func);
        }
    }

    deactivate() {
        clearInterval(this._updateInterval);
        Input.KeyDown.unsubscribeAll();
    }

    addGameObject(gameObject: GameObject) {
        this.gameObjects.push(gameObject);
    }

    removeGameObject(gameObject: GameObject) {
        const index = this.gameObjects.indexOf(gameObject);
        if (index >= 0) {
            this.gameObjects.splice(index, 1);
        }
    }

    abstract update(): void;
}

export class Scene2D extends Scene {
    constructor(sceneName: string) {
        super(sceneName, SceneType.Scene2D);
        this._context = this._canvas.getContext('2d');
    }

    _context: CanvasRenderingContext2D;

    update() {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        const objectWithCollider = this.gameObjects.filter((gameObject) => {
            return gameObject.hasComponent(Collider2D);
        });
        for (const firstObject of objectWithCollider) {
            const firstCollider = firstObject.getComponent(Collider2D);
            firstCollider.colliders.forEach((collider) => {
                for (const secondObject of objectWithCollider) {
                    if (secondObject == firstObject) {
                        continue;
                    }
                    const secondCollider = secondObject.getComponent(Collider2D);
                    secondCollider.colliders.forEach((otherCollider) => {
                        const collisionPoint = collider.collisionPointsWith(otherCollider);
                        if (collisionPoint.length) {
                            if (!firstCollider.isColliding) {
                                firstCollider.collisionBegin.invoke({ other: secondObject, points: collisionPoint, collider: collider });
                                firstCollider.isColliding = true;
                            }
                            firstCollider.collisionOverlap.invoke({ other: secondObject, points: collisionPoint, collider: collider });
                        } else {
                            if (firstCollider.isColliding) {
                                firstCollider.collisionEnd.invoke({ other: secondObject, points: collisionPoint, collider: collider });
                                firstCollider.isColliding = false;
                            }
                        }
                    })
                }
            });
        }
        for (const gObj of this.gameObjects) {
            gObj.draw(this._context);
        }
    }

}

export class Scene3D extends Scene {
    constructor(sceneName: string) {
        super(sceneName, SceneType.Scene3D);
        this._context = this._canvas.getContext('webgl');
    }

    _context: WebGLRenderingContext;

    update() {

    }
}

export type Context = CanvasRenderingContext2D | WebGL2RenderingContext | WebGLRenderingContext | ImageBitmapRenderingContext | null;
