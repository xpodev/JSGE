import GameEvent from "../../../include/game-events";
import Component from "../component";
import { ICollider, Collision } from "./types";

class Collider extends Component {
    protected readonly _colliders: ICollider[] = [];

    public collisionOverlap = new GameEvent<[Collision]>();
    public collisionBegin = new GameEvent<[Collision]>();
    public collisionEnd = new GameEvent<[Collision]>();
    private _isColliding: boolean = false;

    get isColliding(): boolean {
        return this._isColliding
    }

    set isColliding(v: boolean) {
        this._isColliding = v;
    }
}

export default Collider;