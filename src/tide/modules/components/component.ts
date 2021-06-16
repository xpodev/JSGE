import GameObject from "../game-object";

export default class Component {
    constructor(gameObject: GameObject) {
        this._gameObject = gameObject;
    }

    private _gameObject: GameObject;
    private _enabled = true;

    public readonly name = this.constructor.name;

    get gameObject() {
        return this._gameObject;
    }

    enable(v: boolean = true) {
        this._enabled = v;
    }

    get enabled() {
        return this._enabled;
    }
}