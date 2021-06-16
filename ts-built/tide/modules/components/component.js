export default class Component {
    constructor(gameObject) {
        this._enabled = true;
        this.name = this.constructor.name;
        this._gameObject = gameObject;
    }
    get gameObject() {
        return this._gameObject;
    }
    enable(v = true) {
        this._enabled = v;
    }
    get enabled() {
        return this._enabled;
    }
}
