import GameObject from "./JSGE.GameObject.js";
import Input from "../include/JSGE.Input.js";

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

class Scene {
    constructor(private sceneName: string, private sceneType: SceneType) {
        this._canvas = document.createElement("canvas");
        this._canvas.style.width = "100%";
        this._canvas.style.height = "100%";
    }

    private _updateInterval: number;
    protected _canvas: HTMLCanvasElement;
    protected _context: CanvasRenderingContext2D | WebGLRenderingContext;
    public readonly gameObjects: GameObject[] = [];

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
            this.forAllObjects((gObj) => {
                gObj.event.dispatchEvent(new KeyboardEvent("keydown", event));
            })
        });
        
        document.addEventListener("keyup", (event) => {
            this.forAllObjects((gObj) => {
                gObj.event.dispatchEvent(new KeyboardEvent("keyup", event));
            })
        });
        
        document.body.append(this._canvas);
        this._updateInterval = setInterval(() => {
            this.update();
        }, 1000/60);
    }

    forAllObjects(func: (gObj: GameObject) => any) {
        for (const gObj of this.gameObjects) {
            func(gObj);
            gObj.forAllChildren(func);
        }
    }

    deactivate() {
        clearInterval(this._updateInterval);
    }
    
    addGameObject(gameObject: GameObject) {
        this.gameObjects.push(gameObject);
    }

    update() {
        
    }
}

export class Scene2D extends Scene {
    constructor(sceneName: string) {
        super(sceneName, SceneType.Scene2D);
        this._context = this._canvas.getContext('2d');
    }

    _context: CanvasRenderingContext2D;

    update() {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        for(const gObj of this.gameObjects) {
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
}

export type Context = CanvasRenderingContext2D | WebGL2RenderingContext | WebGLRenderingContext | null;
