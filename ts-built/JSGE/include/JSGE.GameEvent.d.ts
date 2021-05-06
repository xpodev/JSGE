declare class GameEvent<T extends Array<any>> {
    private _callbacks;
    subscribe(callback: (...args: T) => void): void;
    unsubscribe(callback: (...args: T) => void): void;
    invoke(...args: T): void;
}
export default GameEvent;
