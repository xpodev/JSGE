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
        this._canvas.style.width = "100%";
        this._canvas.style.height = "100%";
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
            this.forAllObjects((gObj) => {
                gObj.event.dispatchEvent(new KeyboardEvent("keydown", event));
            });
        });
        document.addEventListener("keyup", (event) => {
            this.forAllObjects((gObj) => {
                gObj.event.dispatchEvent(new KeyboardEvent("keyup", event));
            });
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
    }
    addGameObject(gameObject) {
        this.gameObjects.push(gameObject);
    }
    update() {
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
}
