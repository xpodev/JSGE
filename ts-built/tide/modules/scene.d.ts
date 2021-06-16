import GameObject from "./game-object";
export declare enum SceneType {
    /**
     * Don't use that
     */
    Scene0D = 0,
    /**
     * Don't use that
     */
    Scene1D = 1,
    /**
     * You can use that
     */
    Scene2D = 2,
    /**
     * You can use that
     */
    Scene3D = 3,
    /**
     * Don't use that
     */
    Scene4D = 4
}
declare abstract class Scene {
    private sceneName;
    private sceneType;
    constructor(sceneName: string, sceneType: SceneType);
    private _updateInterval;
    protected readonly _canvas: HTMLCanvasElement;
    protected readonly abstract _context: Context;
    readonly gameObjects: GameObject[];
    private _updateLoopDone;
    get name(): string;
    get type(): SceneType;
    activate(): void;
    forAllObjects(func: (gObj: GameObject) => any): void;
    deactivate(): void;
    addGameObject(gameObject: GameObject): void;
    removeGameObject(gameObject: GameObject): void;
    abstract update(): void;
}
export declare class Scene2D extends Scene {
    constructor(sceneName: string);
    _context: CanvasRenderingContext2D;
    update(): void;
}
export declare class Scene3D extends Scene {
    constructor(sceneName: string);
    _context: WebGLRenderingContext;
    update(): void;
}
export declare type Context = CanvasRenderingContext2D | WebGL2RenderingContext | WebGLRenderingContext | ImageBitmapRenderingContext | null;
export {};
