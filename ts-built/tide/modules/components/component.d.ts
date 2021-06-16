import GameObject from "../game-object";
export default class Component {
    constructor(gameObject: GameObject);
    private _gameObject;
    private _enabled;
    readonly name: string;
    get gameObject(): GameObject;
    enable(v?: boolean): void;
    get enabled(): boolean;
}
