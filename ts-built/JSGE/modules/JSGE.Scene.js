import Input from "../include/JSGE.Input.js";
export var SceneType;
(function (SceneType) {
    /**
     * Don't use that
     */
    SceneType[SceneType["Scene0D"] = 0] = "Scene0D";
    /**
     * Don't use that
     */
    SceneType[SceneType["Scene1D"] = 1] = "Scene1D";
    /**
     * You can use that
     */
    SceneType[SceneType["Scene2D"] = 2] = "Scene2D";
    /**
     * You can use that
     */
    SceneType[SceneType["Scene3D"] = 3] = "Scene3D";
    /**
     * Don't use that
     */
    SceneType[SceneType["Scene4D"] = 4] = "Scene4D";
})(SceneType || (SceneType = {}));
;
class Scene {
    constructor(sceneName, sceneType) {
        this.sceneName = sceneName;
        this.sceneType = sceneType;
        this.gameObjects = [];
        this._canvas = document.createElement("canvas");
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;
    }
    get name() {
        return this.sceneName;
    }
    get type() {
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
        document.body.append(this._canvas);
        this._updateInterval = setInterval(() => {
            this.update();
        }, 1000 / 60);
    }
    forAllObjects(func) {
        for (const gObj of this.gameObjects) {
            func(gObj);
            gObj.forAllChildren(func);
        }
    }
    deactivate() {
        clearInterval(this._updateInterval);
        Input.KeyDown.unsubscribeAll();
    }
    addGameObject(gameObject) {
        this.gameObjects.push(gameObject);
    }
}
export class Scene2D extends Scene {
    constructor(sceneName) {
        super(sceneName, SceneType.Scene2D);
        this._context = this._canvas.getContext('2d');
    }
    update() {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        for (const gObj of this.gameObjects) {
            gObj.draw(this._context);
        }
    }
}
export class Scene3D extends Scene {
    constructor(sceneName) {
        super(sceneName, SceneType.Scene3D);
        this._context = this._canvas.getContext('webgl');
    }
    update() {
    }
}
