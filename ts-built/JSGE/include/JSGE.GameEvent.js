class GameEvent {
    constructor() {
        this._callbacks = [];
    }
    subscribe(callback) {
        this._callbacks.push(callback);
    }
    unsubscribe(callback) {
        const index = this._callbacks.findIndex((cb) => cb === callback);
        if (index != -1) {
            this._callbacks.splice(index);
        }
    }
    unsubscribeAll() {
        this._callbacks = [];
    }
    invoke(...args) {
        this._callbacks.forEach(cb => {
            cb(...args);
        });
    }
}
export default GameEvent;
