import GameEvent from "../../../include/game-events";
import Component from "../component";
class Collider extends Component {
    constructor() {
        super(...arguments);
        this._colliders = [];
        this.collisionOverlap = new GameEvent();
        this.collisionBegin = new GameEvent();
        this.collisionEnd = new GameEvent();
        this._isColliding = false;
    }
    get isColliding() {
        return this._isColliding;
    }
    set isColliding(v) {
        this._isColliding = v;
    }
}
export default Collider;
