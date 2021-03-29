export var SceneType;
(function (SceneType) {
    SceneType[SceneType["Scene0D"] = 0] = "Scene0D";
    SceneType[SceneType["Scene1D"] = 1] = "Scene1D";
    SceneType[SceneType["Scene2D"] = 2] = "Scene2D";
    SceneType[SceneType["Scene3D"] = 3] = "Scene3D";
    SceneType[SceneType["Scene4D"] = 4] = "Scene4D"; // don't use this
})(SceneType || (SceneType = {}));
;
class Scene {
    constructor(sceneName, sceneType) {
        this.sceneName = sceneName;
        this.sceneType = sceneType;
    }
    get name() {
        return this.sceneName;
    }
    get type() {
        return this.sceneType;
    }
}
;
export class Scene2D extends Scene {
    constructor(sceneName) {
        super(sceneName, SceneType.Scene2D);
    }
}
;
export class Scene3D extends Scene {
    constructor(sceneName) {
        super(sceneName, SceneType.Scene3D);
    }
}
;
