declare class GameEvent<T extends Array<any>> {
    private _callbacks;
    subscribe(callback: (...args: T) => void): void;
    unsubscribe(callback: (...args: T) => void): void;
    unsubscribeAll(): void;
    invoke(...args: T): void;
}
export default GameEvent;
