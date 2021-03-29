export declare enum SceneType {
    Scene0D = 0,
    Scene1D = 1,
    Scene2D = 2,
    Scene3D = 3,
    Scene4D = 4
}
declare class Scene {
    private sceneName;
    private sceneType;
    constructor(sceneName: string, sceneType: SceneType);
    get name(): string;
    get type(): SceneType;
}
export declare class Scene2D extends Scene {
    constructor(sceneName: string);
}
export declare class Scene3D extends Scene {
    constructor(sceneName: string);
}
export {};
