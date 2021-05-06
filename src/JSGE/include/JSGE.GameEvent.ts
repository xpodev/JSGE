class GameEvent<T extends Array<any>> {
    private _callbacks: Array<(...args: T) => void> = [];

    subscribe(callback: (...args: T) => void) {
        this._callbacks.push(callback);
    }

    unsubscribe(callback: (...args: T) => void) {
        const index = this._callbacks.findIndex((cb) => cb === callback);
        if (index != -1) {
            this._callbacks.splice(index);
        }
    }

    unsubscribeAll() {
        this._callbacks = [];
    }

    invoke(...args: T) {
        this._callbacks.forEach(cb => {
            cb(...args);
        })
    }
}

export default GameEvent;