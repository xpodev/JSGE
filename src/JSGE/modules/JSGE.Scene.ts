export enum SceneType {
    Scene0D, // don't use this
    Scene1D, // don't use this
    Scene2D, // use this
    Scene3D, // use this
    Scene4D  // don't use this
};

class Scene {
    constructor(private sceneName: string, private sceneType: SceneType) {

    }

    public get name(): string {
        return this.sceneName;
    }

    public get type(): SceneType {
        return this.sceneType;
    }
};

export class Scene2D extends Scene {
    constructor(sceneName: string) {
        super(sceneName, SceneType.Scene2D);
    }
};

export class Scene3D extends Scene {
    constructor(sceneName: string) {
        super(sceneName, SceneType.Scene3D);
    }
};
