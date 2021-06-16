import GameEvent from "../../../include/game-events";
import Component from "../component";
import { ICollider, Collision } from "./types";
declare class Collider extends Component {
    protected readonly _colliders: ICollider[];
    collisionOverlap: GameEvent<[Collision]>;
    collisionBegin: GameEvent<[Collision]>;
    collisionEnd: GameEvent<[Collision]>;
    private _isColliding;
    get isColliding(): boolean;
    set isColliding(v: boolean);
}
export default Collider;
